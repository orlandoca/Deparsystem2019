class CreateEdificios < ActiveRecord::Migration
  def change
    create_table :edificios do |t|
      t.string :nombre_edificio
      t.string :nombre_propietario
      t.string :direccion

      t.timestamps null: false
    end
  end
end
