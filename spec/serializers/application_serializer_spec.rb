require 'rails_helper'

RSpec.describe ApplicationSerializer do
  my_view = Class.new(ApplicationSerializer) do
    def render(name, surname:)
      { name: name, surname: surname }
    end    
  end

  describe '::render' do
    it 'delegates to #render' do
      result = my_view.render('John', surname: 'Smith')
      expect(result).to eq(name: 'John', surname: 'Smith')
    end
  end
end
