class CreateRecibos < ActiveRecord::Migration
  def change
    create_table :recibos do |t|
      t.integer :contrato_id
      t.date :fecha

      t.timestamps null: false
    end
    add_foreign_key(:recibos, :contratos)
  end
end
