# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170701002529) do

  create_table "cajas", force: :cascade do |t|
    t.integer  "usuario_id",   limit: 4
    t.datetime "fecha_cierre"
    t.integer  "apertura",     limit: 4
    t.integer  "cierre",       limit: 4
    t.integer  "entrada",      limit: 4
    t.integer  "salida",       limit: 4
    t.boolean  "estado"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "contratos", force: :cascade do |t|
    t.integer  "inquilino_id",    limit: 4
    t.integer  "departamento_id", limit: 4
    t.date     "fecha_contrato"
    t.date     "inicio_contrato"
    t.date     "fin_contrato"
    t.date     "vencimiento"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "imagen",          limit: 255
  end

  add_index "contratos", ["departamento_id"], name: "contratos_departamento_id_fk", using: :btree
  add_index "contratos", ["inquilino_id"], name: "contratos_inquilino_id_fk", using: :btree

  create_table "departamentos", force: :cascade do |t|
    t.integer  "edificio_id",         limit: 4
    t.string   "nombre_departamento", limit: 255
    t.integer  "precio",              limit: 4
    t.string   "descripcion",         limit: 255
    t.boolean  "estado"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  add_index "departamentos", ["edificio_id"], name: "departamentos_edificio_id_fk", using: :btree

  create_table "detalle_recibos", force: :cascade do |t|
    t.integer  "recibo_id",   limit: 4
    t.integer  "cuota",       limit: 4
    t.string   "descripcion", limit: 255
    t.integer  "total",       limit: 4
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "edificios", force: :cascade do |t|
    t.string   "nombre_edificio",    limit: 255
    t.string   "nombre_propietario", limit: 255
    t.string   "direccion",          limit: 255
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  create_table "inquilinos", force: :cascade do |t|
    t.integer  "cedula",     limit: 4
    t.string   "nombre",     limit: 255
    t.string   "apellido",   limit: 255
    t.integer  "telefono",   limit: 4
    t.string   "email",      limit: 255
    t.boolean  "estado"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "models", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
  end

  add_index "models", ["email"], name: "index_models_on_email", unique: true, using: :btree
  add_index "models", ["reset_password_token"], name: "index_models_on_reset_password_token", unique: true, using: :btree

  create_table "mov_cajas", force: :cascade do |t|
    t.integer  "caja_id",    limit: 4
    t.string   "concepto",   limit: 255
    t.integer  "ingreso",    limit: 4
    t.integer  "egreso",     limit: 4
    t.integer  "saldo",      limit: 4
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "movimientos", force: :cascade do |t|
    t.string   "contrato_id", limit: 255
    t.integer  "cuota",       limit: 4
    t.date     "vencimiento"
    t.integer  "monto",       limit: 4
    t.boolean  "estado"
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "recibos", force: :cascade do |t|
    t.integer  "contrato_id", limit: 4
    t.date     "fecha"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  add_index "recibos", ["contrato_id"], name: "recibos_contrato_id_fk", using: :btree

  create_table "usuarios", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
  end

  add_index "usuarios", ["email"], name: "index_usuarios_on_email", unique: true, using: :btree
  add_index "usuarios", ["reset_password_token"], name: "index_usuarios_on_reset_password_token", unique: true, using: :btree

