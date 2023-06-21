module ApiErrors
  class RecordInvalidError < StandardError
    def initialize(errors = [])
      @errors = errors
      @status = '422'
      @title = 'Unprocessable Entity'
    end

    def serializable_hash
      errors.each_with_object([]) do |error, memo|
        memo << {
          title: title,
          detail: error.full_message,
          status: status,
          source: { pointer: "/data/attributes/#{error.attribute}" }
        }
      end
    end

    private

    attr_reader :errors
  end
end
