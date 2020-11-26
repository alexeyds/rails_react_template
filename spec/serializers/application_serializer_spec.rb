require 'rails_helper'

RSpec.describe ApplicationSerializer do
  simple_serializer = Class.new(ApplicationSerializer) do
    def render(item)
      "#{item}_baz"
    end
  end

  assigns_serializer = Class.new(ApplicationSerializer) do
    def render(item, prefix:)
      "#{prefix}_#{item}"
    end
  end

  describe '::render' do
    it 'calls #render on a new instance' do
      result = simple_serializer.render('foo')
      expect(result).to eq('foo_baz')
    end

    it 'passes assigns' do
      result = assigns_serializer.render('foo', prefix: 'bar')
      expect(result).to eq('bar_foo')
    end
  end

  describe '::render_many' do
    it 'calls #render for each array member' do
      result = simple_serializer.render_many(['foo', 'bar'])
      expect(result).to eq(['foo_baz', 'bar_baz'])
    end

    it 'passes assigns' do
      result = assigns_serializer.render_many(['foo', 'baz'], prefix: 'bar')
      expect(result).to eq(['bar_foo', 'bar_baz'])
    end
  end
end
