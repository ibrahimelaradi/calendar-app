# Calendar App

App made for an interview task

# Completed tasks

## Authentication

- [x] Users should be able to sign up and log in
- [ ] **BONUS** support forget-password functionality

## My Calendar View

- [x] Calendar style view similar to Google Calendar
- [x] Display events specific to the user’s calendar
- [x] Allow users to add events directly from this view

## My Events View

- [x] Show all events (paginated, sortable, searchable and filterable)
- [x] Users can add events from this view, (for example, an "Add" button that redirects to a form page, or something more creative)

## **BONUS** Event Sharing

- [x] Users can share specific events with others
- [x] Event invites should start in a “Pending” state
- [x] Recipients can “Accept” the invite, adding the event to their calendar
- [ ] Implement filters to distinguish events created by the user vs. others

## **BONUS** Calendar Sharing

- [ ] Users can share their entire calendar with others
- [ ] Users can view calendars shared with them
- [ ] Calendar invites should also be in a “Pending” state until accepted

## **EXTRA BONUS** Google Calendar Integration

- [ ] Explore integrating with Google Calendar for seamless synchronization

## Extra features (not requested in the task)

- [x] Public events (visible to everyone in the platform)
- [x] Recurring events (yearl basis)
- [x] Invite rejection

# Deploy with docker

```bash
# Copy and check environment variables at .env
cp example.env .env
# Start up docker containers
docker compose up
```

# Run locally

```bash
# Install node modules
yarn
# Build schemas
yarn build:schema
# Startup backend dev
yarn backend dev
# Startup frontend dev
yarn frontend start --configuration=development
```
