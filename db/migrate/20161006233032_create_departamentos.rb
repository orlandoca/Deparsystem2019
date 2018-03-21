class CreateDepartamentos < ActiveRecord::Migration
  def change
    create_table :departamentos do |t|
      t.integer :edificio_id
      t.string :nombre_departamento
      t.integer :precio
      t.string :descripcion
      t.boolean :estado

      t.timestamps null: false
    end
    add_foreign_key(:departamentos, :edificios)
  end
end
