module ApiErrors
  class NotAuthorizedError < StandardError
    def initialize(message = nil)
      super(
        status: '403',
        title: 'Forbidden',
        detail: message || 'Permission Denied'
      )
    end
  end
end
