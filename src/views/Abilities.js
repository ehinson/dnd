import React, { Fragment } from 'react';
import { Field } from 'redux-form/immutable';


export const Abilities = (props) => (
  <Fragment>
    <div>
      <label htmlFor="strength">strength</label>
      <Field name="strength" component="input" type="number" min="-10" max="20" />
      <input type="button" value="Roll" onClick={()=> props.generateAbilityScore('strength', 6, 4)}/>
    </div>
    <div>
      <label htmlFor="dexterity">dexterity</label>
      <Field name="dexterity" component="input" type="number" min="-10" max="20" />
      <input type="button" value="Roll" onClick={()=> props.generateAbilityScore('dexterity', 6, 4)}/>
    </div>
    <div>
      <label htmlFor="constitution">constitution</label>
      <Field name="constitution" component="input" type="number" min="-10" max="20" />
      <input type="button" value="Roll" onClick={()=> props.generateAbilityScore('constitution', 6, 4)}/>
    </div>
    <div>
      <label htmlFor="intelligence">intelligence</label>
      <Field name="intelligence" component="input" type="number" min="-10" max="20" />
      <input type="button" value="Roll" onClick={()=> props.generateAbilityScore('intelligence', 6, 4)}/>
    </div>
    <div>
      <label htmlFor="wisdom">wisdom</label>
      <Field name="wisdom" component="input" type="number" min="-10" max="20" />
      <input type="button" value="Roll" onClick={()=> props.generateAbilityScore('wisdom', 6, 4)}/>
    </div>
    <div>
      <label htmlFor="charisma">charisma</label>
      <Field name="charisma" component="input" type="number" min="-10" max="20" />
      <input type="button" value="Roll" onClick={()=> props.generateAbilityScore('charisma', 6, 4)}/>
    </div>
  </Fragment>
)

export const Classification = () => (
  <Fragment>
    <div>
      <label>Race</label>
      <div>
        <Field name="race" component="select">
          <option />
          <option value="human">Human</option>
          <option value="elf">Elf</option>
          <option value="dwarf">Dwarf</option>
        </Field>
      </div>
    </div>
    <div>
      <label>Category</label>
      <div>
        <Field name="category" component="select">
          <option />
          <option value="fighter">Fighter</option>
          <option value="wizard">Wizard</option>
        </Field>
      </div>
    </div>
  </Fragment>
)

export const Identification = () => (
  <Fragment>
    <div>
      <label>Name</label>
      <div>
        <Field name="name" component="input" />
      </div>
    </div>
  </Fragment>
)
