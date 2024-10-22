class CreateAccounts < ActiveRecord::Migration[7.2]
  def change
    create_table :accounts do |t|
      t.string :name
      t.string :email
      t.boolean :activated, default: :false
      t.string :password_digest

      t.timestamps
    end
    add_index :accounts, :email, unique: true
  end
end
