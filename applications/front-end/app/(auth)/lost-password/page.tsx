/* eslint-disable import/no-default-export */

'use client'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

import classes from '@boilerplate/front-end/app/(auth)/lost-password/styles.module.scss'

export interface AuthLostPasswordPageProps {}

const AuthLostPasswordPage: React.FC<AuthLostPasswordPageProps> = () => (
  <Card style={{ backgroundColor: 'rgb(0, 180, 225)' }}>
    <Card.Body>
      <Form>
        <div>Забули пароль</div>
        <Form.Group className={classes.lost} controlId="exampleFormControlInput1">
          <Form.Label>Електронна пошта</Form.Label>
          <Form.Control type="email" placeholder="Введіть адресу електронної пошти" />
        </Form.Group>
        <Button variant="primary">Гаразд</Button>
      </Form>
    </Card.Body>
  </Card>
)

export default AuthLostPasswordPage
