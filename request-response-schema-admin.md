# Admin API Request & Response Schemas

This document provides the complete request and response schemas for all admin endpoints in the Civic Ops platform.

## Authentication

All admin endpoints (except login) require a Bearer token in the Authorization header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 1. Admin Login

### `POST /admin/login`

#### Request Schema
```json
{
  "username": "string",
  "password": "string"
}
```

#### Response Schema
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "id": 1,
      "username": "swm_admin",
      "full_name": "SWM Administrator",
      "role": "admin",
      "department_id": 1,
      "department_name": "Solid waste management"
    }
  }
}
```

#### Example Request
```bash
curl -X POST "http://localhost:8000/admin/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "swm_admin",
    "password": "swm123"
  }'
```

---

## 2. List Department Issues

### `GET /admin/issues`

#### Request Schema (Query Parameters)
```
status?: string          # Filter by status (reported, in_progress, resolved, rejected)
priority?: string        # Filter by priority (unassigned, low, medium, high, urgent)
category?: string        # Filter by category
page?: integer          # Page number (default: 1)
limit?: integer         # Items per page (default: 20, max: 100)
```

#### Response Schema
```json
{
  "success": true,
  "message": "Issues retrieved successfully",
  "data": {
    "issues": [
      {
        "id": "CIV1759402301204",
        "title": "Overflowing bins - Solid Waste & Sanitation",
        "category": "Solid Waste & Sanitation",
        "subcategory": "Overflowing bins",
        "description": "Garbage bins are overflowing near the main market area causing bad smell and attracting flies",
        "status": "reported",
        "priority": "unassigned",
        "location": {
          "latitude": 28.6139,
          "longitude": 77.209,
          "address": "Main Market, Connaught Place, New Delhi"
        },
        "image_url": "https://civic-ops.s3.amazonaws.com/issues/1759402301_e80cc988.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256...",
        "voice_note_url": "https://civic-ops.s3.amazonaws.com/voice/1759402301_voice.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256...",
        "reported_by": {
          "id": "123",
          "name": "John Doe",
          "phone": "+91-9876543210"
        },
        "created_at": "2025-10-02T10:51:41.199744Z",
        "updated_at": "2025-10-02T10:51:41.199744Z"
      }
    ],
    "total": 15,
    "page": 1,
    "limit": 20,
    "department": {
      "id": 1,
      "name": "Solid waste management"
    }
  }
}
```

#### Example Requests
```bash
# Basic request
curl -X GET "http://localhost:8000/admin/issues" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# With filters
curl -X GET "http://localhost:8000/admin/issues?status=reported&page=1&limit=10" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# With category filter
curl -X GET "http://localhost:8000/admin/issues?category=Solid%20Waste%20%26%20Sanitation" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 3. Issue Locations for Mapping

### `GET /admin/issues/locations`

#### Request Schema (Query Parameters)
```
status?: string          # Filter by status (reported, in_progress, resolved, rejected)
priority?: string        # Filter by priority (unassigned, low, medium, high, urgent)
category?: string        # Filter by category
```

#### Response Schema
```json
{
  "success": true,
  "message": "Issue locations retrieved successfully",
  "data": {
    "department": {
      "id": 1,
      "name": "Solid waste management"
    },
    "locations": [
      {
        "issue_id": "CIV1759402301204",
        "latitude": 28.6139,
        "longitude": 77.209,
        "title": "Overflowing bins - Solid Waste & Sanitation",
        "category": "Solid Waste & Sanitation",
        "subcategory": "Overflowing bins",
        "status": "reported",
        "priority": "unassigned",
        "address": "Main Market, Connaught Place, New Delhi",
        "reported_by": "John Doe",
        "reporter_phone": "+91-9876543210",
        "created_at": "2025-10-02 10:51:41",
        "description": "Garbage bins are overflowing near the main market area causing bad smell and attracting flies..."
      },
      {
        "issue_id": "CIV1759402401305",
        "latitude": 28.6520,
        "longitude": 77.2315,
        "title": "No garbage bin available - Solid Waste & Sanitation",
        "category": "Solid Waste & Sanitation",
        "subcategory": "No garbage bin available",
        "status": "in_progress",
        "priority": "medium",
        "address": "Sector 15, Noida, UP",
        "reported_by": "Jane Smith",
        "reporter_phone": "+91-9876543211",
        "created_at": "2025-10-02 14:20:15",
        "description": "There are no garbage bins available in this residential area..."
      }
    ],
    "statistics": {
      "total_issues": 2,
      "status_breakdown": {
        "reported": 1,
        "in_progress": 1
      },
      "priority_breakdown": {
        "unassigned": 1,
        "medium": 1
      }
    },
    "map_bounds": {
      "north": 28.6520,
      "south": 28.6139,
      "east": 77.2315,
      "west": 77.209
    }
  }
}
```

#### Example Requests
```bash
# All locations for department
curl -X GET "http://localhost:8000/admin/issues/locations" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Filter by status
curl -X GET "http://localhost:8000/admin/issues/locations?status=reported" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Filter by priority
curl -X GET "http://localhost:8000/admin/issues/locations?priority=high" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 4. Heatmap Data

### `GET /admin/issues/heatmap`

#### Request Schema (Query Parameters)
```
status?: string          # Filter by status (reported, in_progress, resolved, rejected)
days?: integer          # Number of days to look back (default: 30, min: 1, max: 365)
```

#### Response Schema
```json
{
  "success": true,
  "message": "Heatmap data retrieved successfully",
  "data": {
    "heatmap_points": [
      {
        "lat": 28.6139,
        "lng": 77.209,
        "weight": 1.0,
        "status": "reported"
      },
      {
        "lat": 28.6520,
        "lng": 77.2315,
        "weight": 1.0,
        "status": "in_progress"
      },
      {
        "lat": 28.6139,
        "lng": 77.209,
        "weight": 1.0,
        "status": "resolved"
      }
    ],
    "total_points": 3,
    "date_range": {
      "start": "2025-09-05",
      "end": "2025-10-05",
      "days": 30
    }
  }
}
```

#### Example Requests
```bash
# Default heatmap (last 30 days)
curl -X GET "http://localhost:8000/admin/issues/heatmap" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Last 7 days
curl -X GET "http://localhost:8000/admin/issues/heatmap?days=7" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Filter by status and time
curl -X GET "http://localhost:8000/admin/issues/heatmap?status=resolved&days=60" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Admin Credentials

| Department | Username | Password |
|------------|----------|----------|
| Solid Waste Management | `swm_admin` | `swm123` |
| Garden Department | `garden_admin` | `garden123` |
| Pollution Department | `pollution_admin` | `pollution123` |
| Streetlighting Department | `lighting_admin` | `lighting123` |
| Super Admin (All departments) | `super_admin` | `super123` |

---

## Error Response Schema

All endpoints can return error responses in this format:

```json
{
  "detail": "Error message describing what went wrong"
}
```

### Common HTTP Status Codes
- `401` - Unauthorized (invalid/expired token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `422` - Validation Error (invalid request parameters)
- `500` - Internal Server Error

---

## Notes

1. **Department Filtering**: All endpoints automatically filter data based on the logged-in admin's department
2. **Fresh URLs**: Image and voice note URLs are regenerated on each request with 4-hour expiry
3. **Pagination**: The `/admin/issues` endpoint supports pagination, while location endpoints return all matching results
4. **Coordinates**: Location endpoints only return issues that have valid latitude/longitude coordinates
5. **Date Filtering**: Heatmap endpoint filters by creation date within the specified day range
6. **Token Expiry**: Admin tokens expire after 8 hours

## Frontend Integration

### Map Integration
Use `/admin/issues/locations` for:
- Google Maps markers
- Leaflet map pins
- Interactive issue popups
- Map bounds calculation

### Heatmap Integration
Use `/admin/issues/heatmap` for:
- Heat layer overlays
- Density visualizations
- Performance-optimized rendering
- Time-based animations

### Dashboard Widgets
Both endpoints provide statistics for:
- Issue count cards
- Status distribution charts
- Priority breakdown graphs
- Department summaries
