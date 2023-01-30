# HRM(Human Resource Management)

# SET UP

## FrontEnd - ReactJs

- npm/yarn install

## BackEnd - Ruby on Rails

- Ruby 3.0.0
- Rails 6.1.7
- install postgres
- bundle install
- setup password database for postgres
- rails db:create
- rails db:migrate
- rails db:seed ( create data )

## Run Project

- rails s (with port 3000)
- npm start (with port 3001)
- account test: 
    email: admin@gmail.com
    pass: Levantung123@

```mermaid
erDiagram
    Staff ||--|{ PropertyProvidingHistory : "provider"
    Staff ||--|{ PropertyProvidingHistory : "receiver"

    Staff ||--|{ OnboardingStep : "assigned person"
    OnboardingStep ||--|{ OnboardingSampleStep : "belongs to"
    OnboardingStep ||--|{ StaffOnboarding : "belongs to"
    Position ||--o{ OnboardingSampleStep : "has"
    Staff ||--o| StaffOnboarding : "has"
    StaffOnboarding }|--|| Position : "belongs to"

    Position ||--|{ Staff : "has"
    Department ||--|{ Staff : "has"
    JobTitle ||--|{ Staff : "has"
    Leave ||--|| Staff : "belongs to"

    Staff ||--o| LeaveApplication : "requester"
    Staff ||--o| LeaveApplication : "approver"

    Staff ||--o| RequestProperty : "requester"
    Staff ||--o| RequestProperty : "approver"

    Property ||--o{ PropertyProvidingHistory : "has many"
    GroupProperty ||--o{ Property : "has"

```
