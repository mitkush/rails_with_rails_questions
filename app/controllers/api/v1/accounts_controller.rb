class Api::V1::AccountsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    account = Account.new(account_params)

    if account.save
      render json: { message: 'Account created successfully' }, status: :created
    else
      error_messages = account.errors.messages.transform_values do |messages|
        messages.map(&:to_s)
      end

      render json: { errors: error_messages }, status: :unprocessable_entity
    end
  end

  private

  def account_params
    params.require(:account).permit(:name, :email, :password)
  end
end

