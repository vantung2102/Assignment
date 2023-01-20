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
    Employer ||..|{ EmployerLocation : owns
    Employer ||..|{ EmployerStaff : has
    EmployerLocation ||..|{ Shift : creates
    Shift ||..|{ Position : "has many"
    Position }|..|{ Assignment : has
    Assignment }|..|{ AssignedSchedule : has
    AssignedSchedule }|..|{ Timecard : "has one"
    Timecard }|--|| TimesheetDetail : "belongs to"
    TimesheetDetail ||--o{ Timesheet : "belongs to"
    Employer ||--o{ Timesheet : has
    Assignment ||--o{ JobResponse : "accepts"
    JobResponse ||--o{ Employee : "applied by"
    Employee ||--o{ Skill : has
    Employee ||--|| VacancyApplicant: is
    VacancyApplicant ||--|{ VacancyApplicantLanguage: uses
    VacancyApplicant ||--|{ VacancyApplicantDocuments: owns
    Position ||--|{ Skill : covers
    Skill ||--|{ SkillType : "belongs to"
    Employee ||--|| OmniEmployee: is
    OmniEmployee ||--|{ Timecard : "works for (OmniEmployeeId)"
    Timesheet ||--|{ Invoice : generates
    Invoice ||--|{ OmniUser : "created by"
    Invoice ||--|{ InvoiceLine : has
    Timesheet ||--o{ Cost : "may has"
    Employer ||--|{ Cost : spends
    Supplier }|--|{ Cost : provides
    Supplier }|--|| SupplierType : "belongs to"

```
