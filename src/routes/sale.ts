import { envs } from '@/config/env';
import { ErrorBody } from '@/types/ErrorBody';
import { CommonResponseBody } from '@/types/CommonResponseBody';
import express from 'express';
import { matches } from '@/utils';
import { Sale, Service, saleMatcher, serviceMatcher } from '../types/Sale';
import { RequestBody } from '../utils';
const router = express.Router();

const { BUSINESS_ENDPOINT } = envs;

//* Index
// router.get(
//     "/",
//     (req, res) => {
//         /* #swagger.responses[200] = {
//             content: {
//                   "application/json": {
//                     ok: true,
//                     code: 200,
//                     data: [
//                         {
//                         },
//                         {
//                         }
//                     ]
//                 }
//             }
//           }
//         */
//         /* #swagger.responses[500] = {
//             content: {
//                 "application/json": {
//                     ok: false,
//                     code: 500,
//                     data: {
//                         message: "¡Ha ocurrido un problema inesperado!"
//                     } 
//                 }
//             }
//           }
//         */
//         fetch(BUSINESS_ENDPOINT)
//             .then(response => response.json())
//             .then(services => {
//                 if (Array.isArray(services)) {
//                     const CODE = 200;
//                     const response = new CommonResponseBody(
//                         true,
//                         CODE,
//                         services
//                     )
//                     res.status(CODE).send(response);
//                 } else {
//                     const CODE = 500;
//                     const error: ErrorBody = {
//                         private: "La lista de serviceos no pasa el typecheck de array en Index",
//                         public: new CommonResponseBody(
//                             false,
//                             CODE,
//                             {
//                                 message: "¡Ha ocurrido un problema inesperado!"
//                             }
//                         )
//                     }
//                     console.log(error.private);
//                     res.status(CODE).send(error.public);
//                 }
//             }).catch(err => {
//                 const CODE = 500;
//                 const error: ErrorBody = {
//                     private: "Error inesperado en llamado fetch en Index",
//                     public: new CommonResponseBody(
//                         false,
//                         CODE,
//                         {
//                             message: "¡Ha ocurrido un problema inesperado!"
//                         }
//                     ),
//                     errorObject: err
//                 }
//                 console.log(error.private);
//                 console.error(error.errorObject)
//                 res.status(CODE).send(error.public);
//             })
//     }
// );

//* Show
// router.get(
//     "/:id",
//     (req, res) => {
//         /* #swagger.responses[200] = {
//                 content: {
//                     "application/json": {
//                         ok: false,
//                         code: 200,
//                         data: {
//                         }
//                     }
//                 }
//             }
//         */
//         /* #swagger.responses[500] = {
//             content: {
//                 "application/json": {
//                     ok: false,
//                     code: 500,
//                     data: {
//                         message: "¡Ha ocurrido un problema inesperado!"
//                     } 
//                 }
//             }
//           }
//         */
//         fetch(
//             `${BUSINESS_ENDPOINT}${req.params.id}/`
//         ).then(response => response.json())
//         .then(service => {
//                     const CODE = 200;
//                     const response = new CommonResponseBody(
//                         true,
//                         CODE,
//                         service
//                     )
//                     res.status(CODE).send(response);
//                 res.status(200).send(service);
//         }).catch(err => {
//             const CODE = 500;
    
//             const error: ErrorBody = {
//                 private: "Error inesperado en llamado fetch en Show",
//                 public: new CommonResponseBody(
//                     false,
//                     CODE,
//                     {
//                         message: "¡Ha ocurrido un problema inesperado!"
//                     }
//                 ),
//                 errorObject: err
//             }
//             console.log(error.private);
//             console.error(error.errorObject)
//             res.status(CODE).send(error.public);
//         })
//     }
// );

//* ShowList
// router.get(
//     "/list/:ids",
//     (req, res) => {
//         /* #swagger.responses[200] = {
//             content: {
//                   "application/json": {
//                     ok: true,
//                     code: 200,
//                     data: [
//                         {
//                         },
//                         {
//                         }
//                     ]
//                 }
//             }
//           }
//         */
//         /* #swagger.responses[500] = {
//             content: {
//                 "application/json": {
//                     ok: false,
//                     code: 500,
//                     data: {
//                         message: "¡Ha ocurrido un problema inesperado!"
//                     } 
//                 }
//             }
//           }
//         */
//         fetch(
//             `${BUSINESS_ENDPOINT}list/${req.params.ids}/`
//         ).then(response => response.json())
//         .then(services => {
//                 res.status(200).send(services);
//         }).catch(err => {
//             const CODE = 500;
    
//             const error: ErrorBody = {
//                 private: "Error inesperado en llamado fetch en ShowList",
//                 public: new CommonResponseBody(
//                     false,
//                     CODE,
//                     {
//                         message: "¡Ha ocurrido un problema inesperado!"
//                     }
//                 ),
//                 errorObject: err
//             }
//             console.log(error.private);
//             console.error(error.errorObject)
//             res.status(CODE).send(error.public);
//         })
//     }
// );

//* Store
router.post(
    "/",
    (req, res) => {
        /* #swagger.responses[201] = {
                content: {
                    "application/json": {
                        ok: false,
                        code: 201,
                        data: {
                        }
                    }
                }
            }
        */
        /* #swagger.responses[422] = {
            content: {
                "application/json": {
                    ok: false,
                    code: 422,
                    data: {
                        message: "La forma del cuerpo no coincide con la forma de Servicio"
                    } 
                }
            }
          }
        */
        /* #swagger.responses[500] = {
            content: {
                "application/json": {
                    ok: false,
                    code: 500,
                    data: {
                        message: "¡Ha ocurrido un problema inesperado!"
                    } 
                }
            }
          }
        */
        const service: Service & RequestBody = req.body;

        if (!matches(service, serviceMatcher)) {
            const CODE = 422;
            
            const error: ErrorBody = {
                private: "Error inesperado en llamado fetch en Store",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "La forma del cuerpo no coincide con la forma de Servicio"
                    }
                )
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
            return;
        }
        
        fetch(
            BUSINESS_ENDPOINT,
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(service)
            }
        ).then(response => (console.log(response), response.json()))
        .then(Sale => {
            if (matches(Sale, saleMatcher)) {
                const response = new CommonResponseBody(
                    true,
                    201,
                    Sale
                )
                res.status(201).send(response);
            } else {
                const CODE = 500;
                const error: ErrorBody = {
                    private: "La venta retornada no pasa el typecheck en Store",
                    public: new CommonResponseBody(
                        false,
                        CODE,
                        {
                            message: "¡Ha ocurrido un problema inesperado!"
                        }
                    )
                }
                console.log(Sale);
                console.log(error.private);
                res.status(CODE).send(error.public);
            }
        }).catch(err => {
            const CODE = 500;

            const error: ErrorBody = {
                private: "Error inesperado en llamado fetch en Store",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                ),
                errorObject: err
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
        })
    }
)


module.exports = router;
export default router;