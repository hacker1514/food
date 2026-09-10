# Sri Skanda Home Foods - Executive Server & Persistent Data Manager
import os
import json
import datetime
import random
import functools
import urllib.request
from http.server import HTTPServer, SimpleHTTPRequestHandler
from urllib.parse import parse_qs, urlparse

PORT = 8000
DB_DIR = os.path.join(os.path.dirname(__file__), 'database')
DATA_PATH = os.path.join(DB_DIR, 'store_data.json')
PUBLIC_DIR = os.path.join(os.path.dirname(__file__), 'public')

# Secure Server-Side Configuration
ADMIN_PIN = "1514"
GROQ_API_KEY = "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"

# Default Initial Menu Items Data
DEFAULT_MENU = [
    {
        "id": "munaga-podi",
        "name": "Munaga Podi",
        "transliteration": "Drumstick Leaf / Moringa Powder",
        "category": "podis",
        "badge": "Bestseller",
        "image": "images/podis.jpg",
        "description": "Nutrient-rich Moringa leaf powder expertly blended with traditional Brahmin spices, garlic-free & wholesome.",
        "healthBenefit": "Rich in iron, antioxidants & immunity boosters. Perfect with hot rice & cow ghee.",
        "prices": { "100g": 120, "250g": 300, "500g": 600, "1kg": 1200 }
    },
    {
        "id": "palli-podi",
        "name": "Palli Podi",
        "transliteration": "Spiced Peanut Powder",
        "category": "podis",
        "badge": "Protein Rich",
        "image": "images/podis.jpg",
        "description": "Slow-roasted premium groundnuts ground with roasted lentils, cumin, and mild Kashmiri red chilies.",
        "healthBenefit": "High in plant protein & healthy fats. Delicious with Idli, Dosa, or steamed rice.",
        "prices": { "100g": 65, "250g": 130, "500g": 260, "1kg": 520 }
    },
    {
        "id": "nuvvula-podi",
        "name": "Nuvvula Podi",
        "transliteration": "Toasted Sesame Seed Powder",
        "category": "podis",
        "badge": "Calcium Power",
        "image": "images/podis.jpg",
        "description": "Aromatic white sesame seeds lightly toasted and ground with authentic South Indian spice mix.",
        "healthBenefit": "Excellent source of calcium, zinc, and healthy dietary fiber.",
        "prices": { "100g": 80, "250g": 185, "500g": 360, "1kg": 720 }
    },
    {
        "id": "avisa-podi",
        "name": "Avisa Podi",
        "transliteration": "Flaxseed Spice Powder",
        "category": "podis",
        "badge": "Superfood",
        "image": "images/podis.jpg",
        "description": "Golden organic flax seeds slow-roasted and ground into a fragrant, earthy spice powder.",
        "healthBenefit": "Loaded with Omega-3 fatty acids for heart & joint health. Enjoy daily with hot rice.",
        "prices": { "100g": 120, "250g": 290, "500g": 580, "1kg": 1150 }
    },
    {
        "id": "karivepaku-podi",
        "name": "Karivepaku Podi",
        "transliteration": "Fresh Curry Leaf Powder",
        "category": "podis",
        "badge": "Traditional",
        "image": "images/podis.jpg",
        "description": "Hand-picked farm fresh curry leaves sun-dried and pounded with pepper, cumin, and roasted chana dal.",
        "healthBenefit": "Promotes hair growth, aids digestion, and controls blood sugar naturally.",
        "prices": { "100g": 80, "250g": 170, "500g": 340, "1kg": 650 }
    },
    {
        "id": "kobbari-podi",
        "name": "Kobbari Podi",
        "transliteration": "Coconut Spice Mix",
        "category": "podis",
        "badge": "Flavorful",
        "image": "images/podis.jpg",
        "description": "Grated sun-dried dry coconut (Kopra) tempered with lentils, red chilies, and aromatic asafoetida.",
        "healthBenefit": "Rich, satisfying coastal aroma. Enhances vegetable stir-fries, tiffins, and rice.",
        "prices": { "100g": 110, "250g": 270, "500g": 530, "1kg": 1050 }
    },
    {
        "id": "rasam-powder",
        "name": "Rasam Powder",
        "transliteration": "Authentic Brahmin Rasam Podi",
        "category": "podis",
        "badge": "Signature Secret",
        "image": "images/podis.jpg",
        "description": "Heritage family recipe blend of coriander seeds, black pepper, cumin, turmeric, and fenugreek.",
        "healthBenefit": "Instant comfort soup mix that boosts digestion and soothes throat & stomach.",
        "prices": { "100g": 90, "250g": 175, "500g": 330, "1kg": 650 }
    },
    {
        "id": "kandhi-podi",
        "name": "Kandhi Podi",
        "transliteration": "Toor Dal / Paruppu Podi",
        "category": "podis",
        "badge": "Comfort Food",
        "image": "images/podis.jpg",
        "description": "Golden roasted Toor Dal (pigeon peas) pounded with red chilies, black pepper, and hing.",
        "healthBenefit": "Classic South Indian comfort dish. Serve with hot rice, pure ghee, and papad.",
        "prices": { "100g": 90, "250g": 160, "500g": 320, "1kg": 640 }
    },
    {
        "id": "putnala-podi",
        "name": "Putnala Podi",
        "transliteration": "Roasted Gram Dal Powder",
        "category": "podis",
        "badge": "Mild & Tasty",
        "image": "images/podis.jpg",
        "description": "Crispy fried chana dal blended with mild garlic, cumin, and sea salt. Light on the stomach.",
        "healthBenefit": "Easy to digest protein snack powder, perfect for kids & elders.",
        "prices": { "100g": 65, "250g": 160, "500g": 320, "1kg": 640 }
    },
    {
        "id": "dry-fruit-laddu",
        "name": "Dry Fruit Laddu",
        "transliteration": "Sugar-Free Premium Energy Balls",
        "category": "sweets",
        "badge": "No Added Sugar",
        "image": "images/sweets.jpg",
        "description": "Rich combination of dates, figs, California almonds, cashews, and pistachios bound with pure ghee.",
        "healthBenefit": "100% natural sweetness from dates & figs. Superior healthy stamina booster.",
        "prices": { "100g": 130, "250g": 330, "500g": 640, "1kg": 1275 }
    },
    {
        "id": "palli-chikki",
        "name": "Palli Chikki",
        "transliteration": "Peanut Jaggery Brittle",
        "category": "sweets",
        "badge": "Organic Jaggery",
        "image": "images/sweets.jpg",
        "description": "Crunchy golden roasted peanuts set in melted organic jaggery with a touch of cardamom.",
        "healthBenefit": "High energy, rich in iron & healthy monounsaturated fats.",
        "prices": { "100g": 65, "250g": 160, "500g": 310, "1kg": 625 }
    },
    {
        "id": "nuvvula-chikki",
        "name": "Nuvvula Chikki",
        "transliteration": "Sesame Jaggery Brittle (Til Chikki)",
        "category": "sweets",
        "badge": "Mineral Rich",
        "image": "images/sweets.jpg",
        "description": "Traditional crunchy sesame seed bar sweetened with pure unrefined jaggery syrup.",
        "healthBenefit": "Provides body warmth, strengthens bones, and enhances skin health.",
        "prices": { "100g": 65, "250g": 160, "500g": 310, "1kg": 625 }
    },
    {
        "id": "ragi-laddu",
        "name": "Ragi Laddu",
        "transliteration": "Finger Millet Sweet Balls",
        "category": "sweets",
        "badge": "Millet Special",
        "image": "images/sweets.jpg",
        "description": "Sprouted finger millet flour slow-cooked in pure cow ghee and organic jaggery.",
        "healthBenefit": "Supercharged with calcium, fiber & iron. Ideal guilt-free sweet snack.",
        "prices": { "100g": 100, "250g": 250, "500g": 500, "1kg": 1000 }
    },
    {
        "id": "sunnundalu",
        "name": "Sunnundalu",
        "transliteration": "Roasted Black Gram / Urad Dal Laddu",
        "category": "sweets",
        "badge": "Authentic Classic",
        "image": "images/sweets.jpg",
        "description": "Traditional Andhra Brahmin specialty made from slow-roasted urad dal, pure ghee, and jaggery.",
        "healthBenefit": "Strengthens spine & muscles. A timeless festive nourishing delicacy.",
        "prices": { "100g": 135, "250g": 320, "500g": 640, "1kg": 1250 }
    },
    {
        "id": "dry-gulab-jamun",
        "name": "Dry Gulab Jamun",
        "transliteration": "Local Fresh Sweet (2 Pieces)",
        "category": "specials",
        "badge": "Local Special",
        "image": "images/hero.jpg",
        "description": "Melt-in-your-mouth soft dry gulab jamun soaked in fragrant cardamom syrup. (Available locally near Madanapalle)",
        "healthBenefit": "Freshly made daily in small batches with pure milk solids.",
        "prices": { "Pack of 2 pcs": 20 }
    },
    {
        "id": "custom-millet-order",
        "name": "Custom Millet Sweets & Snacks",
        "transliteration": "Foxtail, Kodo, Barnyard & Little Millet Specials",
        "category": "specials",
        "badge": "Made to Order",
        "image": "images/sweets.jpg",
        "description": "We prepare customized traditional sweets, laddus, and savory snacks using organic Millets tailored to your taste & dietary preference.",
        "healthBenefit": "Gluten-free, diabetic-friendly, and packed with ancient grain nutrition.",
        "prices": { "Custom Quote": 0 }
    }
]

os.makedirs(DB_DIR, exist_ok=True)

# Dynamic Admin Passcode Retriever
def get_admin_pin():
    data = load_store_data()
    return str(data.get("admin_pin", ADMIN_PIN))

# Load Data from JSON
def load_store_data():
    if not os.path.exists(DATA_PATH):
        initial_data = {
            "menu_items": DEFAULT_MENU,
            "orders": [] # Clean real data starting with 0 fake orders!
        }
        save_store_data(initial_data)
        return initial_data
    try:
        with open(DATA_PATH, 'r', encoding='utf-8') as f:
            data = json.load(f)
            if "menu_items" not in data or not data["menu_items"]:
                data["menu_items"] = DEFAULT_MENU
            if "orders" not in data:
                data["orders"] = []
            return data
    except Exception:
        initial_data = {"menu_items": DEFAULT_MENU, "orders": []}
        save_store_data(initial_data)
        return initial_data

# Save Data to JSON
def save_store_data(data):
    with open(DATA_PATH, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

# Custom Request Handler
class SkandaRequestHandler(SimpleHTTPRequestHandler):

    def do_GET(self):
        try:
            parsed = urlparse(self.path)
            path = parsed.path

            # Serve Admin Page
            if path == '/admin' or path == '/admin/':
                self.path = '/admin.html'
                return super().do_GET()

            # API: Public Live Menu
            if path == '/api/menu':
                data = load_store_data()
                return self.send_json_response(200, {"success": True, "menu": data.get("menu_items", [])})

            # API: Admin Get Orders
            if path == '/api/admin/orders':
                return self.handle_get_orders(parsed)

            # API: Admin Get Stats
            if path == '/api/admin/stats':
                return self.handle_get_stats()

            return super().do_GET()
        except Exception as e:
            import traceback
            traceback.print_exc()
            self.send_error_json(500, str(e))

    def do_POST(self):
        try:
            parsed = urlparse(self.path)
            path = parsed.path

            content_length = int(self.headers.get('Content-Length', 0))
            body_data = self.rfile.read(content_length).decode('utf-8') if content_length > 0 else "{}"
            
            try:
                payload = json.loads(body_data)
            except Exception:
                payload = {}

            # API: Create Customer Order
            if path == '/api/orders':
                return self.handle_create_order(payload)

            # API: Customer Sync Active Orders
            if path == '/api/customer/sync-orders':
                return self.handle_sync_customer_orders(payload)

            # API: Admin Login
            if path == '/api/admin/login':
                return self.handle_admin_login(payload)

            # API: Admin Change Passcode
            if path == '/api/admin/change-pin':
                return self.handle_change_admin_pin(payload)

            # API: AI Assistant
            if path == '/api/chat':
                return self.handle_chat(payload)

            # API: Admin Add Menu Item
            if path == '/api/admin/menu':
                return self.handle_add_menu_item(payload)

            self.send_error_json(404, "Endpoint not found")
        except Exception as e:
            import traceback
            traceback.print_exc()
            self.send_error_json(500, str(e))

    def do_PUT(self):
        try:
            parsed = urlparse(self.path)
            path = parsed.path

            # API: Admin Edit Menu Item
            if path.startswith('/api/admin/menu/'):
                item_id = path.split('/')[-1]
                content_length = int(self.headers.get('Content-Length', 0))
                body_data = self.rfile.read(content_length).decode('utf-8')
                try:
                    payload = json.loads(body_data)
                except Exception:
                    payload = {}
                return self.handle_update_menu_item(item_id, payload)

            self.send_error_json(404, "Endpoint not found")
        except Exception as e:
            self.send_error_json(500, str(e))

    def do_PATCH(self):
        try:
            parsed = urlparse(self.path)
            path = parsed.path

            if path.startswith('/api/admin/orders/'):
                order_id = path.split('/')[-1]
                content_length = int(self.headers.get('Content-Length', 0))
                body_data = self.rfile.read(content_length).decode('utf-8')
                try:
                    payload = json.loads(body_data)
                except Exception:
                    payload = {}
                return self.handle_update_order(order_id, payload)

            self.send_error_json(404, "Endpoint not found")
        except Exception as e:
            self.send_error_json(500, str(e))

    def do_DELETE(self):
        try:
            parsed = urlparse(self.path)
            path = parsed.path

            # API: Admin Delete Menu Item
            if path.startswith('/api/admin/menu/'):
                item_id = path.split('/')[-1]
                return self.handle_delete_menu_item(item_id)

            # API: Admin Delete Order
            if path.startswith('/api/admin/orders/'):
                order_id = path.split('/')[-1]
                return self.handle_delete_order(order_id)

            self.send_error_json(404, "Endpoint not found")
        except Exception as e:
            self.send_error_json(500, str(e))

    # --- API HANDLERS ---
    def handle_add_menu_item(self, payload):
        data = load_store_data()
        menu = data.get("menu_items", [])

        name = payload.get('name', '').strip()
        if not name:
            return self.send_json_response(400, {"success": False, "error": "Item name is required"})

        item_id = payload.get('id') or name.lower().replace(' ', '-').replace('/', '-') + f"-{random.randint(100, 999)}"

        new_item = {
            "id": item_id,
            "name": name,
            "transliteration": payload.get('transliteration', name),
            "category": payload.get('category', 'podis'),
            "badge": payload.get('badge', 'Fresh Batch'),
            "image": payload.get('image', 'images/podis.jpg'),
            "description": payload.get('description', 'Fresh homemade Brahmin preparation.'),
            "healthBenefit": payload.get('healthBenefit', 'Pure traditional recipe.'),
            "prices": payload.get('prices', { "100g": 100, "250g": 250, "500g": 500, "1kg": 1000 })
        }

        menu.append(new_item)
        data["menu_items"] = menu
        save_store_data(data)

        self.send_json_response(201, {"success": True, "message": "New item added successfully!", "item": new_item})

    def handle_update_menu_item(self, item_id, payload):
        data = load_store_data()
        menu = data.get("menu_items", [])

        found_idx = next((i for i, item in enumerate(menu) if item['id'] == item_id), -1)
        if found_idx == -1:
            return self.send_json_response(404, {"success": False, "error": "Menu item not found"})

        item = menu[found_idx]
        if 'name' in payload: item['name'] = payload['name']
        if 'transliteration' in payload: item['transliteration'] = payload['transliteration']
        if 'category' in payload: item['category'] = payload['category']
        if 'badge' in payload: item['badge'] = payload['badge']
        if 'image' in payload: item['image'] = payload['image']
        if 'description' in payload: item['description'] = payload['description']
        if 'healthBenefit' in payload: item['healthBenefit'] = payload['healthBenefit']
        if 'prices' in payload: item['prices'] = payload['prices']

        menu[found_idx] = item
        data["menu_items"] = menu
        save_store_data(data)

        self.send_json_response(200, {"success": True, "message": "Menu item updated successfully!", "item": item})

    def handle_delete_menu_item(self, item_id):
        data = load_store_data()
        menu = data.get("menu_items", [])
        data["menu_items"] = [i for i in menu if i['id'] != item_id]
        save_store_data(data)
        self.send_json_response(200, {"success": True, "message": "Menu item deleted successfully!"})

    def handle_create_order(self, payload):
        data = load_store_data()
        orders = data.get("orders", [])

        order_num = f"SKD-{datetime.datetime.now().year}-{random.randint(1000, 9999)}"
        created_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        items = payload.get('items', [])
        total_amount = payload.get('total_amount', 0)
        cust_name = payload.get('customer_name', 'Guest')
        cust_phone = payload.get('customer_phone', '+91 94900 68924')
        cust_address = payload.get('customer_address', 'Address on WhatsApp')
        cust_city = payload.get('customer_city', 'Madanapalle')
        cust_notes = payload.get('customer_notes', '')

        new_order = {
            "id": len(orders) + 1,
            "order_number": order_num,
            "customer_name": cust_name,
            "customer_phone": cust_phone,
            "customer_address": cust_address,
            "customer_city": cust_city,
            "items": items,
            "total_amount": total_amount,
            "order_status": "Pending",
            "payment_status": "Unpaid",
            "customer_notes": cust_notes,
            "created_at": created_time
        }

        orders.insert(0, new_order)
        data["orders"] = orders
        save_store_data(data)

        self.send_json_response(201, {
            "success": True,
            "message": "Order saved successfully!",
            "order_number": order_num,
            "total_amount": total_amount,
            "order": new_order
        })

    def handle_sync_customer_orders(self, payload):
        order_numbers = payload.get('order_numbers', [])
        phone = payload.get('phone', '').strip().replace(' ', '').replace('-', '')
        
        data = load_store_data()
        all_orders = data.get("orders", [])

        active_orders = []
        for o in all_orders:
            o_num = o.get('order_number')
            o_phone = (o.get('customer_phone') or '').replace(' ', '').replace('-', '')
            
            matches_num = order_numbers and (o_num in order_numbers)
            matches_phone = phone and (phone in o_phone or o_phone in phone)
            
            if matches_num or matches_phone:
                active_orders.append(o)

        self.send_json_response(200, {
            "success": True,
            "orders": active_orders
        })

    def handle_admin_login(self, payload):
        pin = str(payload.get('pin', '')).strip()
        current_pin = get_admin_pin()
        if pin == current_pin:
            self.send_json_response(200, {
                "success": True,
                "token": "skanda_admin_secret_token_1514",
                "message": "Login successful!"
            })
        else:
            self.send_json_response(401, {
                "success": False,
                "message": "Invalid Admin Passcode!"
            })

    def handle_change_admin_pin(self, payload):
        current_pin = str(payload.get('current_pin', '')).strip()
        new_pin = str(payload.get('new_pin', '')).strip()

        if not new_pin or len(new_pin) < 4:
            return self.send_json_response(400, {
                "success": False,
                "message": "New passcode must be at least 4 digits or characters!"
            })

        stored_pin = get_admin_pin()
        if current_pin != stored_pin:
            return self.send_json_response(401, {
                "success": False,
                "message": "Current passcode is incorrect!"
            })

        data = load_store_data()
        data["admin_pin"] = new_pin
        save_store_data(data)

        self.send_json_response(200, {
            "success": True,
            "message": "Admin Passcode updated successfully!"
        })

    def handle_get_orders(self, parsed):
        params = parse_qs(parsed.query)
        status_filter = params.get('status', ['all'])[0]
        search_query = params.get('search', [''])[0].lower().strip()

        data = load_store_data()
        all_orders = data.get("orders", [])

        orders_list = []
        for o in all_orders:
            matches_status = (status_filter == 'all') or (o['order_status'].lower() == status_filter.lower())
            matches_search = (not search_query) or (
                search_query in o['order_number'].lower() or
                search_query in o['customer_name'].lower() or
                search_query in o['customer_phone'].lower() or
                search_query in o['customer_city'].lower()
            )

            if matches_status and matches_search:
                orders_list.append(o)

        self.send_json_response(200, {
            "success": True,
            "orders": orders_list
        })

    def handle_update_order(self, order_id, payload):
        data = load_store_data()
        orders = data.get("orders", [])

        found = False
        for o in orders:
            if str(o['id']) == str(order_id) or o['order_number'] == order_id:
                if 'order_status' in payload: o['order_status'] = payload['order_status']
                if 'payment_status' in payload: o['payment_status'] = payload['payment_status']
                o['updated_at'] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                found = True
                break

        if found:
            data["orders"] = orders
            save_store_data(data)
            self.send_json_response(200, {"success": True, "message": "Order updated successfully!"})
        else:
            self.send_json_response(404, {"success": False, "error": "Order not found"})

    def handle_delete_order(self, order_id):
        data = load_store_data()
        orders = data.get("orders", [])
        data["orders"] = [o for o in orders if str(o['id']) != str(order_id) and o['order_number'] != order_id]
        save_store_data(data)
        self.send_json_response(200, {"success": True, "message": "Order deleted successfully!"})

    def handle_get_stats(self):
        data = load_store_data()
        orders = data.get("orders", [])

        total_rev = sum(o.get('total_amount', 0) for o in orders)
        total_orders = len(orders)
        pending_orders = sum(1 for o in orders if o.get('order_status') == 'Pending')
        delivered_orders = sum(1 for o in orders if o.get('order_status') == 'Delivered')

        self.send_json_response(200, {
            "success": True,
            "stats": {
                "total_revenue": total_rev,
                "total_orders": total_orders,
                "pending_orders": pending_orders,
                "delivered_orders": delivered_orders
            }
        })

    def handle_chat(self, payload):
        user_message = payload.get('message', '').strip()
        history = payload.get('history', [])

        if not user_message:
            return self.send_json_response(400, {"success": False, "error": "Message cannot be empty"})

        # Build dynamic knowledge base prompt from live menu
        data = load_store_data()
        live_menu = data.get("menu_items", [])

        menu_summary = []
        for i, item in enumerate(live_menu, 1):
            prices_str = " • ".join([f"{w}: ₹{p}" for w, p in item.get('prices', {}).items()])
            menu_summary.append(f"{i}. {item['name']} ({item.get('transliteration', '')}): {prices_str} ({item.get('healthBenefit', '')})")

        dynamic_prompt = f"""You are the official Customer Assistant for Sri Skanda Home Foods (Pure • Authentic • Brahmin Foods).
You are polite, warm, helpful, and deeply knowledgeable about authentic South Indian Brahmin food, spiced powders (podis), pure ghee laddus, and healthy chikkis.

BRAND & BUSINESS INFORMATION:
- Brand Name: Sri Skanda Home Foods
- Tagline: PURE • AUTHENTIC • BRAHMIN FOODS
- Phone & WhatsApp Order Contact: +91 94900 68924
- Location: Near Madanapalle & All Over India Shipping
- Key Quality Badges: 100% Homemade with Tradition & Love, Zero Preservatives & Additives, Freshly Prepared in Small Batches, Safe Moisture-Proof Packaging.

LIVE STORE MENU & PRICING:
{chr(10).join(menu_summary)}

INSTRUCTIONS:
- Answer customer questions accurately about prices, weight options, health benefits, ingredients, and delivery.
- Keep responses concise, warm, polite, and well-structured using bullet points where applicable.
- Guide customers to click the "Add to Cart" or "WhatsApp Order" button on the website for quick ordering.
- NEVER mention "AI", "Groq", "OpenAI", "LLM", "bot", or artificial intelligence technology in your responses. Always speak naturally as the store customer assistant of Sri Skanda Home Foods.
"""

        messages = [{'role': 'system', 'content': dynamic_prompt}]

        for msg in history[-6:]:
            if 'role' in msg and 'content' in msg:
                messages.append({'role': msg['role'], 'content': msg['content']})

        messages.append({'role': 'user', 'content': user_message})

        try:
            groq_payload = json.dumps({
                'model': 'llama-3.3-70b-versatile',
                'messages': messages,
                'temperature': 0.6,
                'max_tokens': 500
            }).encode('utf-8')

            req = urllib.request.Request(
                'https://api.groq.com/openai/v1/chat/completions',
                data=groq_payload,
                headers={
                    'Authorization': f'Bearer {GROQ_API_KEY}',
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0'
                }
            )

            res = urllib.request.urlopen(req)
            groq_response = json.loads(res.read().decode('utf-8'))

            reply = groq_response['choices'][0]['message']['content'].strip()

            self.send_json_response(200, {
                "success": True,
                "reply": reply
            })
        except Exception as err:
            import traceback
            traceback.print_exc()
            self.send_json_response(200, {
                "success": True,
                "reply": "Namaste! 🙏 Thank you for contacting Sri Skanda Home Foods. We offer authentic South Indian Brahmin podis, pure ghee laddus, and traditional sweets made fresh in small batches with zero artificial preservatives. You can browse our complete menu, select pack weights (100g to 1kg), and place your order directly via WhatsApp at +91 94900 68924!"
            })

    def send_json_response(self, code, data):
        self.send_response(code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))

    def send_error_json(self, code, message):
        self.send_json_response(code, {"success": False, "error": message})

if __name__ == '__main__':
    print(f"Starting Sri Skanda Executive Server on http://127.0.0.1:{PORT}")
    handler = functools.partial(SkandaRequestHandler, directory=PUBLIC_DIR)
    server = HTTPServer(('127.0.0.1', PORT), handler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
