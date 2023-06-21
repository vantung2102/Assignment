class JsonWebToken
  def self.jwt_encode(data, exp: 7.days.since)
    payload = { data: data, exp: exp.to_i }
    JWT.encode(payload, secret_key)
  end

  def self.jwt_decode(token)
    decode = JWT.decode(token, secret_key).first
    HashWithIndifferentAccess.new(decode)
  end

  private

  def self.secret_key
    ENV['JWT_SECRET_KEY'] || Rails.application.secrets.secret_key_base.to_s
  end
end
