FROM python:3.11-slim

WORKDIR /app

# Copy application files
COPY . /app

# Ensure database directory exists
RUN mkdir -p /app/database

# Expose default port
EXPOSE 8000

# Set Python unbuffered output
ENV PYTHONUNBUFFERED=1

# Start the Sri Skanda Python server
CMD ["python", "-u", "server.py"]
