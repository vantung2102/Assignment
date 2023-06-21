module ApiErrors
  class NotAuthenticatedError < StandardError
    def initialize(message = nil)
      super(
        status: '401',
        title: 'Unauthorized',
        detail: message || 'You are not authenticated'
      )
    end
  end
end
