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

ActiveRecord::Schema.define(version: 2022_12_01_023945) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.bigint "staff_id"
    t.string "commentable_type"
    t.bigint "commentable_id"
    t.string "content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["commentable_type", "commentable_id"], name: "index_comments_on_commentable"
    t.index ["staff_id"], name: "index_comments_on_staff_id"
  end

  create_table "departments", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "group_properties", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "positions", force: :cascade do |t|
    t.string "name"
    t.bigint "department_id"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["department_id"], name: "index_positions_on_department_id"
  end

  create_table "properties", force: :cascade do |t|
    t.string "code_seri"
    t.string "name"
    t.string "brand"
    t.bigint "group_property_id"
    t.float "price"
    t.datetime "date_buy"
    t.integer "number_of_repairs"
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["group_property_id"], name: "index_properties_on_group_property_id"
  end

  create_table "property_providing_histories", force: :cascade do |t|
    t.integer "provider_id"
    t.integer "receiver_id"
    t.bigint "property_id"
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["property_id"], name: "index_property_providing_histories_on_property_id"
  end

  create_table "request_properties", force: :cascade do |t|
    t.integer "request_type"
    t.string "description"
    t.string "reason"
    t.integer "status"
    t.integer "requester_id"
    t.integer "approver_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.string "resource_type"
    t.bigint "resource_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id"
    t.index ["resource_type", "resource_id"], name: "index_roles_on_resource"
  end

  create_table "staffs", force: :cascade do |t|
    t.string "fullname"
    t.date "date_of_birth"
    t.string "gender"
    t.string "contract_name"
    t.integer "status"
    t.date "start_contract"
    t.date "contract_term"
    t.bigint "position_id"
    t.bigint "department_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "staff_id"
    t.string "email"
    t.string "password_digest"
    t.index ["department_id"], name: "index_staffs_on_department_id"
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

  add_foreign_key "staffs", "staffs"
end
