class ApplicationService
  def self.call(*args)
    new(*args).call
  end

  def call
    raise NotImplementedError, "You must define `call` as instance method in #{self.class.name} class"
  end
end
