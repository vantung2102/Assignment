# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_01_07_185350) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.bigint "staff_id"
    t.string "commentable_type"
    t.bigint "commentable_id"
    t.string "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["commentable_type", "commentable_id"], name: "index_comments_on_commentable"
    t.index ["staff_id"], name: "index_comments_on_staff_id"
  end

  create_table "departments", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "group_properties", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "job_titles", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "leave_applications", force: :cascade do |t|
    t.integer "leave_type"
    t.float "number_of_days_off"
    t.date "start_day"
    t.date "end_day"
    t.integer "status"
    t.integer "staff_id"
    t.integer "approver_id"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "leaves", force: :cascade do |t|
    t.bigint "staff_id"
    t.float "casual_leave"
    t.float "marriage_leave"
    t.float "compassionate_leave"
    t.float "paternity_leave"
    t.float "maternity_leave"
    t.float "unpaid_leave"
    t.float "allowed_number_of_days_off"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["staff_id"], name: "index_leaves_on_staff_id"
  end

  create_table "onboarding_sample_steps", force: :cascade do |t|
    t.string "task"
    t.bigint "position_id"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["position_id"], name: "index_onboarding_sample_steps_on_position_id"
  end

  create_table "onboarding_steps", force: :cascade do |t|
    t.bigint "onboarding_sample_step_id"
    t.bigint "staff_onboarding_id"
    t.integer "assigned_person_id"
    t.integer "status"
    t.date "start_date"
    t.date "due_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["onboarding_sample_step_id"], name: "index_onboarding_steps_on_onboarding_sample_step_id"
    t.index ["staff_onboarding_id"], name: "index_onboarding_steps_on_staff_onboarding_id"
  end

  create_table "performance_appraisal_forms", force: :cascade do |t|
    t.integer "status"
    t.integer "staff_id"
    t.integer "boss_id"
    t.boolean "active", default: false
    t.text "goals_set_staff"
    t.text "goals_set_boss"
    t.text "achievement_staff"
    t.text "achievement_boss"
    t.text "goals_with_company_staff"
    t.text "goals_with_company_boss"
    t.text "challenging_staff"
    t.text "challenging_boss"
    t.text "least_enjoy_staff"
    t.text "least_enjoy_boss"
    t.text "contribute_staff"
    t.text "contribute_boss"
    t.text "current_job_staff"
    t.text "current_job_boss"
    t.text "improvement_staff"
    t.text "improvement_boss"
    t.text "obstructing_staff"
    t.text "obstructing_boss"
    t.text "feedback_staff"
    t.text "feedback_boss"
    t.text "description_staff"
    t.text "description_boss"
    t.date "start_date"
    t.date "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "positions", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "properties", force: :cascade do |t|
    t.string "code_seri"
    t.string "name"
    t.string "brand"
    t.bigint "group_property_id"
    t.float "price"
    t.datetime "date_buy", precision: nil
    t.integer "number_of_repairs"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_property_id"], name: "index_properties_on_group_property_id"
  end

  create_table "property_providing_histories", force: :cascade do |t|
    t.integer "provider_id"
    t.integer "receiver_id"
    t.bigint "property_id"
    t.integer "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["property_id"], name: "index_property_providing_histories_on_property_id"
  end

  create_table "request_properties", force: :cascade do |t|
    t.integer "request_type"
    t.string "description"
    t.string "reason"
    t.integer "status"
    t.integer "requester_id"
    t.integer "approver_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "group_property_id"
    t.index ["group_property_id"], name: "index_request_properties_on_group_property_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.string "resource_type"
    t.bigint "resource_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
    t.index ["resource_type", "resource_id"], name: "index_roles_on_resource"
  end

  create_table "staff_contracts", force: :cascade do |t|
    t.string "title"
    t.bigint "staff_id"
    t.date "start_date"
    t.date "end_date"
    t.integer "status"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["staff_id"], name: "index_staff_contracts_on_staff_id"
  end

  create_table "staff_onboardings", force: :cascade do |t|
    t.bigint "staff_id"
    t.boolean "active"
    t.integer "position_id"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["staff_id"], name: "index_staff_onboardings_on_staff_id"
  end

  create_table "staffs", force: :cascade do |t|
    t.string "fullname"
    t.date "date_of_birth"
    t.string "gender"
    t.integer "status"
    t.bigint "position_id"
    t.bigint "department_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "staff_id"
    t.string "email"
    t.string "password_digest"
    t.datetime "deleted_at", precision: nil
    t.bigint "job_title_id"
    t.string "phone"
    t.text "address"
    t.date "join_date"
    t.index ["deleted_at"], name: "index_staffs_on_deleted_at"
    t.index ["department_id"], name: "index_staffs_on_department_id"
    t.index ["job_title_id"], name: "index_staffs_on_job_title_id"
    t.index ["position_id"], name: "index_staffs_on_position_id"
    t.index ["staff_id"], name: "index_staffs_on_staff_id"
  end

  create_table "staffs_roles", id: false, force: :cascade do |t|
    t.bigint "staff_id"
    t.bigint "role_id"
    t.index ["role_id"], name: "index_staffs_roles_on_role_id"
    t.index ["staff_id", "role_id"], name: "index_staffs_roles_on_staff_id_and_role_id"
    t.index ["staff_id"], name: "index_staffs_roles_on_staff_id"
  end

  add_foreign_key "request_properties", "group_properties"
  add_foreign_key "staffs", "job_titles"
  add_foreign_key "staffs", "staffs"
end
