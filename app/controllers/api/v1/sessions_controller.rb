class Api::V1::SessionsController < ApplicationController
  protect_from_forgery with: :null_session

  def create
    account = Account.find_by(email: params[:email])

    if account&.authenticate(params[:password])
      token = encode_token(account_id: account.id)
      render json: { account: account, token: token }, status: :ok
    else
      render json: { errors: {login: ["Invalid Email or Password"]} }, status: :unauthorized
    end
  end

  private

  def encode_token(payload)
    JWT.encode(payload, Rails.application.credentials.secret_key_base)
  end
end
