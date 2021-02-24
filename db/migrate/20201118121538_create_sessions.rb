class CreateSessions < ActiveRecord::Migration[6.1]
  def change
    create_table :sessions, id: :uuid do |t|
      t.references :user, foreign_key: true
      t.datetime :expires_at

      t.timestamps
    end
  end
end
