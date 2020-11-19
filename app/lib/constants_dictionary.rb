class ConstantsDictionary
  def self.from_array(array)
    dict = array.map {|i| [i, i.to_s] }.to_h
    self.new(dict)
  end

  attr_reader :all

  def initialize(dict)
    @all = dict

    dict.each do |key, value|
      define_singleton_method(key) do
        value
      end
    end
  end
end
