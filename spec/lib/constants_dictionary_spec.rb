require 'rails_helper'

RSpec.describe ConstantsDictionary do
  describe '#new' do
    it 'defines method shortcuts' do
      dict = ConstantsDictionary.new({foo: "bar"})
      expect(dict.foo).to eq("bar")
    end
  end

  describe '#all' do
    it 'returns hash' do
      dict = ConstantsDictionary.new({foo: "bar"})
      expect(dict.all).to eq({foo: "bar"})
    end
  end

  describe '::from_array' do
    it 'defines method shortcuts and converts values to strings' do
      dict = ConstantsDictionary.from_array([:foo, :bar])

      expect(dict.foo).to eq('foo')
      expect(dict.bar).to eq('bar')
    end
  end
end
