import React, { Fragment } from 'react';
import { Field, FormSection } from 'redux-form/immutable';


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

export const Classification = (props) => (
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
    { props.player.getIn(['category', "name"]) === "fighter" &&
    <div>
    <label>Choose Fighting Style</label>
    <div>
      <Field name="features" component="select">

        <option />
        {props.featureChoices.map(choice => (
          <option key={choice.get('name')} value={choice.get('name')} >{choice.get('name')}</option>
        ))}

      </Field>
      { props.hasFeatureChoice && <div>{props.featureChoices.filter(el => el.get('name') === props.hasFeatureChoice).getIn([0,'desc', 0])}</div>}
    </div>
  </div>
  }
  { props.player.getIn(['category', "name"]) &&
    <div>
    <label>Choose Proficiencies</label>
    <div>
     {/* validation check length and deselect/stop pointer events when length === 2 */}
      <Field name="proficiencies" component="select" type="select-multiple" multiple>
        <option />
        {props.proficiencyChoices.map(choice => (
          <option key={choice.get('name')}  value={choice.get('name')} >{choice.get('name')}</option>
        ))}
      </Field>
    </div>
  </div>
  }
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

// field arrays?
export const Equipment = (props) => (
  <Fragment>
    <div>
      <label>Starting Equipment</label>
      { props.equipmentChoices.map((choice, index) => (
        <div key={`choice_${index}`}>
          <Field name={`choice_${index}`} component="select">
            <option />
            {choice.map(choiceGroup => (
              <option value={choiceGroup.get('title')} key={choiceGroup.get('title')} >{choiceGroup.get('title')}</option>
            ))}
          </Field>

            {choice.map((choiceGroup) => (
              props.hasEquipmentChoice && props.hasEquipmentChoice.includes(choiceGroup.get('title')) && choiceGroup.get('checkboxes') &&
                <FormSection name={`${choiceGroup.get('title')}`}>
                  {choiceGroup.get('items').map(it => (
                    <label key={it.get('name')}>
                      {it.get('name')}
                      <Field name={it.get('name')}  id={it.get('name')} component="input" type="checkbox"/>
                    </label>
                  ))}
              </FormSection>
            )
          )}
        </div>
      )) }
      </div>
  </Fragment>
)

// on choosing weapons, add them to actions with stats?
