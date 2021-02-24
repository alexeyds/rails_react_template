import jutest from "test/browser_jutest";
import ClosestForm from "form/closest_form";

jutest("ClosestForm", s => {
  s.describe("constructor", s => {
    s.test("sets default attributes", t => {
      let register = () => {};
      let form = new ClosestForm({ register });

      t.equal(form.register, register);
      t.equal(form.name, null);
    });

    s.test("accepts configurable attributes", t => {
      let form = new ClosestForm({ name: 'test' });

      t.equal(form.name, 'test');
    });
  });

  s.describe("#getInputName()", s => {
    s.test("returns provided name as is", t => {
      let form = new ClosestForm({});
      t.equal(form.getInputName('name'), 'name');
    });

    s.test("prepends form name to input name", t => {
      let form = new ClosestForm({ name: 'user' });
      t.equal(form.getInputName('name'), 'user[name]');
    });
  });

  s.describe("#getDefaultValue()", s => {
    s.test("returns undefined", t => {
      let form = new ClosestForm({});
      t.equal(form.getDefaultValue('name'), undefined);
    });

    s.test("extracts value from {defaultValues}", t => {
      let form = new ClosestForm({ defaultValues: { name: 'John' } });
      t.equal(form.getDefaultValue('name'), 'John');
    });

    s.test("can dig in nested objects", t => {
      let form = new ClosestForm({ defaultValues: { user: { name: 'John' } } });
      t.equal(form.getDefaultValue('user[name]'), 'John');
    });
  });

  s.describe("#extractSubmittedData()", s => {
    s.test("returns submitted data as is", t => {
      let data = { foo: 'bar' };
      let form = new ClosestForm({});

      t.equal(form.extractSubmittedData(data), data);
    });

    s.test("extracts data for given form name", t => {
      let data = { user: { foo: 'bar' } };
      let form = new ClosestForm({ name: 'user' });

      t.equal(form.extractSubmittedData(data), data.user);
    });
  });

  s.describe("getInputProps()", s => {
    s.test("returns ref and input name", t => {
      let form = new ClosestForm({ register: () => {} });
      let props = form.getInputProps({ name: 'name' });

      t.equal(props.ref, form.register);
      t.equal(props.name, 'name');
    });

    s.test("returns defaultValue", t => {
      let form = new ClosestForm({ defaultValues: { name: 'John' } });
      let props = form.getInputProps({ name: 'name' });

      t.equal(props.defaultValue, 'John');
    });

    s.test("works with named form", t => {
      let form = new ClosestForm({ name: 'user', defaultValues: { name: 'John' } });
      let props = form.getInputProps({ name: 'name' });

      t.equal(props.defaultValue, 'John');
      t.equal(props.name, 'user[name]');
    });

    s.test("does not set defaultValue if {value} is provided", t => {
      let form = new ClosestForm({ defaultValues: { name: 'John' } });
      let props = form.getInputProps({ name: 'name', value: '' });

      t.equal(props.defaultValue, undefined);
    });

    s.test("returns all other props unchanged", t => {
      let form = new ClosestForm({});
      let props = form.getInputProps({ name: 'test', foo: 'bar' });

      t.equal(props.foo, 'bar');
    });
  });
});
