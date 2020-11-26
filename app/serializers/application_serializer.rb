class ApplicationSerializer
  def self.render(item, **assigns)
    if assigns.any?
      new.render(item, **assigns)
    else
      new.render(item)
    end
  end

  def self.render_many(items, **assigns)
    items.map { |i| render(i, **assigns) }
  end
end
