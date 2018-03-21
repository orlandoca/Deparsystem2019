class CreateContratos < ActiveRecord::Migration
  def change
    create_table :contratos do |t|
      t.integer :inquilino_id
      t.integer :departamento_id
      t.date :fecha_contrato
      t.date :inicio_contrato
      t.date :fin_contrato
      t.date :vencimiento

      t.timestamps null: false
    end
    add_foreign_key(:contratos, :inquilinos)
    add_foreign_key(:contratos, :departamentos)
  end
end
