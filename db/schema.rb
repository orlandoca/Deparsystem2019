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

ActiveRecord::Schema.define(version: 20180508005045) do

  create_table "cajas", force: :cascade do |t|
    t.integer  "usuario_id"
    t.datetime "fecha_cierre"
    t.integer  "apertura"
    t.integer  "cierre"
    t.integer  "entrada"
    t.integer  "salida"
    t.boolean  "estado"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "contratos", force: :cascade do |t|
    t.integer  "inquilino_id"
    t.integer  "departamento_id"
    t.date     "fecha_contrato"
    t.date     "inicio_contrato"
    t.date     "fin_contrato"
    t.date     "vencimiento"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "imagen"
  end

  create_table "departamentos", force: :cascade do |t|
    t.integer  "edificio_id"
    t.string   "nombre_departamento"
    t.integer  "precio"
    t.string   "descripcion"
    t.boolean  "estado"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
  end

  create_table "detalle_recibos", force: :cascade do |t|
    t.integer  "recibo_id"
    t.integer  "cuota"
    t.string   "descripcion"
    t.integer  "total"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "edificios", force: :cascade do |t|
    t.string   "nombre_edificio"
    t.string   "nombre_propietario"
    t.string   "direccion"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  create_table "gastos", force: :cascade do |t|
    t.integer  "edificio_id"
    t.integer  "cantidad"
    t.string   "detalle"
    t.integer  "costo"
    t.integer  "total"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "inquilinos", force: :cascade do |t|
    t.integer  "cedula"
    t.string   "nombre"
    t.string   "apellido"
    t.integer  "telefono"
    t.string   "email"
    t.boolean  "estado"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "models", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "models", ["email"], name: "index_models_on_email", unique: true
  add_index "models", ["reset_password_token"], name: "index_models_on_reset_password_token", unique: true

  create_table "mov_cajas", force: :cascade do |t|
    t.integer  "caja_id"
    t.string   "concepto"
    t.integer  "ingreso"
    t.integer  "egreso"
    t.integer  "saldo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "movimientos", force: :cascade do |t|
    t.string   "contrato_id"
    t.integer  "cuota"
    t.date     "vencimiento"
    t.integer  "monto"
    t.boolean  "estado"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "recibos", force: :cascade do |t|
    t.integer  "contrato_id"
    t.date     "fecha"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "usuarios", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "usuarios", ["email"], name: "index_usuarios_on_email", unique: true
  add_index "usuarios", ["reset_password_token"], name: "index_usuarios_on_reset_password_token", unique: true

end
