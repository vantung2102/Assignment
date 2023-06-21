module ApiErrors
  class StandardError < ::StandardError
    attr_reader :title, :detail, :status, :source

    def initialize(title: nil, detail: nil, status: nil, source: nil) # rubocop:disable Lint/MissingSuper
      @title = title || 'Something went wrong'
      @detail = detail || "We're sorry, but something went wrong"
      @status = status || '500'
      @source = source || {}
    end

    def to_h
      {
        title: title,
        detail: detail,
        status: status,
        source: source
      }.compact_blank
    end

    def serializable_hash
      to_h
    end

    def to_s
      to_h.to_s
    end
  end
end
