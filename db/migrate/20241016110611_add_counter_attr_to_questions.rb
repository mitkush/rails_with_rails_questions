class AddCounterAttrToQuestions < ActiveRecord::Migration[7.2]
  def change
    add_column :questions, :likes_count, :integer
    add_column :questions, :dislikes_count, :integer
  end
end
