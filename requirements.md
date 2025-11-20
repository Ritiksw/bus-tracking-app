# Bus Tracking App – Requirements

## 1. Overview
- **Goal**: Provide an auditable, real-time station-to-station workflow for buses, from departure request through arrival confirmation, with GPS visibility for staff and (optionally) passengers.
- **Tech stack**: Angular 16 front end, Spring Boot 3 back end (Java 17), PostgreSQL, Redis, WebSocket/SSE, Dockerized deployment.

## 2. Actors & Roles
- **Driver / Conductor**: Requests departure, starts approved segments, reports arrivals, device streams GPS data.
- **Station Master**: Receives and approves/rejects departure requests for their station.
- **Admin**: Manages users, buses, routes, stations, and system configuration.
- **Passenger (optional MVP stretch)**: Views live bus location and ETA updates.

## 3. Functional Scope (MVP)
### 3.1 Authentication & Authorization
- JWT-based auth with role-based access control for `DRIVER`, `STATION_MASTER`, `ADMIN`.
- User management UI for admins (create, update, disable users, assign roles).

### 3.2 Reference Data Management
- CRUD for routes, stations, buses, drivers/conductors, and station masters.
- Route definition links ordered stations; buses can be assigned to routes.

### 3.3 Trip Lifecycle
- Create trips composed of ordered `TripSegment` entries (fromStation → toStation).
- Driver requests departure, generating `TripSegment` with status `PENDING`.
- Station master approves or rejects request; approval triggers notifications to driver/admin dashboards.
- Approved segment can be started by driver → status `IN_TRANSIT`.
- Driver marks arrival → status `ARRIVED`; record timestamps, duration, and audit trail (request, approval, start, arrival).

### 3.4 GPS Tracking
- Driver device batches GPS coordinates to backend (REST endpoint) while `IN_TRANSIT`.
- Store recent GPS trail per segment; expose latest position and speed on dashboards.
- Support offline buffering on the device (driver app caches and resends when back online).

### 3.5 Notifications & Real-Time Updates
- WebSocket/SSE channel delivers:
  - Pending approval alerts to station masters.
  - Approval decisions and status transitions to drivers/admins.
  - Location updates for active segments (for ops/passenger dashboards).

### 3.6 Passenger View (optional MVP stretch)
- Public or authenticated view showing live map of active buses with ETA from closest station.

## 4. Non-Functional Requirements
- **Auditability**: Record timestamped events for each segment transition (requested, approved, started, arrived).
- **Reliability**: Handle intermittent connectivity for driver devices; ensure at-least-once GPS delivery.
- **Security**: Protect APIs via HTTPS, JWT, and role enforcement. Log sensitive actions.
- **Performance**: Support real-time updates for 100 concurrent active segments without noticeable latency (>2s).
- **Scalability**: Designed to scale horizontally via Docker/Kubernetes.

## 5. Technical Notes
- Use Docker Compose for local environment: Spring Boot API, PostgreSQL, Redis.
- Angular 16 front end served separately (ng serve) in dev; production build served via static hosting or behind API gateway.
- Map integration to use Mapbox GL JS (default) or pluggable provider; store API keys via environment configs.
- Future enhancements: push notifications, predictive ETA, analytics dashboards, mobile app wrapper (Capacitor/React Native).

## 6. Open Questions / Next Steps
- Confirm final map provider and licensing (Mapbox vs Google Maps).
- Decide on mobile strategy (PWA vs native shell) for driver offline buffering.
- Define detailed user stories & UI wireframes for approval workflow and dashboards.
- Establish deployment pipeline (CI/CD) and environment strategy (dev / staging / prod).

