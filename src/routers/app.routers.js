import { Router } from 'express'

import {
    createList,
    deleteList,
    getList,
    getLists,
    updateList,
} from '../controllers/catalogo.controllers.js'
import {
    createContact,
    deleteContact,
    getContact,
    getContacts,
} from '../controllers/consulta.controllers.js'

import { loginApp } from '../controllers/login.controllers.js'

const router = Router()

router.get('/catalogo', getLists)

router.get('/catalogo/:id', getList)

router.post('/catalogo', createList)

router.patch('/catalogo/:id', updateList)

router.delete('/catalogo/:id', deleteList)

router.get('/contacto', getContacts)

router.get('/contacto/:id', getContact)

router.post('/contacto', createContact)

router.delete('/contacto/:id', deleteContact)

router.post('/login', loginApp)

export default router
