class CreateInquilinos < ActiveRecord::Migration
  def change
    create_table :inquilinos do |t|
      t.integer :cedula
      t.string :nombre
      t.string :apellido
      t.integer :telefono
      t.string :email
      t.boolean :estado

      t.timestamps null: false
    end
  end
end
