You are building the Centralized Supervision module for the Civic Issue Reporting and Resolution System.

📂 Location: @modules/reports/

🎯 Objective:
Create a complete reports management page for the Admin Panel that enables centralized supervision of all citizen complaints.

Use the reference from the `request-response-schema-admin.md` file and integrate the correct endpoints for data fetching and updates.

---

### 🧩 Requirements & Features

1. **Fetch & Display Reports**
   - Use the endpoint: `GET /admin/issues`
   - Show all submitted complaints in a paginated table view.
   - Include columns: Issue ID, Title, Category, Status, Priority, Department, Reported By, Date Reported, and Actions.
   - Implement filters for status, category, and priority using dropdowns.

2. **View Report Details**
   - On clicking a row or “View Details” button, open a modal showing:
     - Full description
     - Image (if available)
     - Voice Note (if available)
     - Location (latitude, longitude, and address)
     - Reported By details
     - Created & Updated dates

3. **Assign to Department**
   - Add an "Assign Department" button in each report row.
   - When clicked, show a dropdown of departments (use hardcoded or fetched list).
   - On selection, send a PATCH or POST request to update assignment.

4. **Reject Complaint**
   - Include a “Reject” button that calls an endpoint (use update route from schema).
   - Ask for a reason before rejecting (use a modal input field).
   - Show status update immediately after API success.

5. **Mark as Solved**
   - Include a “Mark as Solved” button.
   - Prompt for a short resolution description.
   - Send update request with status `resolved` and description to backend.
   - Reflect status change in the UI dynamically.

6. **View Reports on Map**
   - Add a "View on Map" button that opens a modal with an **OpenLayers Map API**.
   - Fetch coordinates from `GET /admin/issues/locations`
   - Display the selected report’s pin on the map.
   - Show basic popup info (issue title, category, reporter name).

7. **Interactive UI / UX**
   - Use Node.js for frontend logic and routing.
   - Use Vanilla JS and CSS for design and interactivity (no external frameworks unless necessary).
   - Table should support sorting by date, category, and priority.
   - Add hover effects, button animations, and loading states.

8. **Error Handling**
   - Follow error schema from the MD file:
     ```json
     {
       "detail": "Error message describing what went wrong"
     }
     ```
   - Show user-friendly alerts (e.g., “Failed to load reports”, “Action successful”).

9. **Authentication**
   - Include Bearer token in all requests.
   - Token can be retrieved from `localStorage` or session context.
   - Redirect to login page if 401/403 response is received.

---

### 🧠 Additional Design Hints
- Use a clean two-column layout: filters on the left, reports list on the right.
- Use modals or side panels for viewing report details.
- Include real-time refresh button (“↻ Refresh Data”).
- Add badge colors for statuses:
  - `reported` → gray  
  - `in_progress` → orange  
  - `resolved` → green  
  - `rejected` → red  

---

### 🔗 Endpoints to Use
- `GET /admin/issues` → Fetch all issues
- `GET /admin/issues/locations` → Fetch coordinates for map
- `PATCH /admin/issues/:id` or similar (if exists) → For assigning, marking resolved, or rejecting
- Use token-based header authentication


Use the following reference for request and response schemas in the `request-response-schema-admin.md` file: