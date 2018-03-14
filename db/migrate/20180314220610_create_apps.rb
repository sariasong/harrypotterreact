class CreateApps < ActiveRecord::Migration[5.1]
  def change
    create_table :apps do |t|
      t.string :name
      t.string :image
      t.string :description
      t.string :house

      t.timestamps
    end
  end
end
