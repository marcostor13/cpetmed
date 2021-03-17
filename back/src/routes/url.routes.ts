import { Router } from "express"
import { getListsBYUserID, saveURL, saveList, getURLsBYCompanyID, getURLsBYListID, delList, delURL, issetCompanyNameAndText, saveMultipleURL, getURLsBYUserID, getURLsBYCompanyIDAndCode, getURLsBYCode, getByID } from './../controllers/url.controller';

const router = Router()

router.post('/save-url', saveURL)
router.post('/save-multiple-url', saveMultipleURL)
router.post('/save-list', saveList)
router.get('/get-lists-by-userid/:userID', getListsBYUserID)
router.get('/get-urls-by-userid/:userID', getURLsBYUserID)
router.get('/get-urls-by-id/:id', getByID)
router.get('/get-urls-by-companyid/:companyID', getURLsBYCompanyID)
router.get('/get-urls-by-code/:code', getURLsBYCode)
router.get('/get-urls-by-companyid-and-code/:companyID/:code', getURLsBYCompanyIDAndCode)
router.post('/isset-companyname-and-text', issetCompanyNameAndText)
router.get('/get-urls-by-list/:listID', getURLsBYListID)
router.delete('/delete-list/:listID', delList)
router.delete('/delete-url/:urlID', delURL)


export default router