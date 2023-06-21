class Auth::ValidateUserFromTokenService < ApplicationService
  def initialize(header, token)
    @header = header
    @token = token
  end

  def call
    user = User.find_by(id: decoded_token&.dig(:data, :staff_id))
    (header == 'Bearer' && user) || raise ApiErrors::NotAuthenticatedError
  end

  private

  attr_reader :header, :token

  def decoded_token
    @decoded_token ||= decode_token(token)
  end

  def decode_token(token)
    JsonWebToken.jwt_decode(token)
  rescue JWT::VerificationError, JWT::DecodeError
    nil
  end
end
