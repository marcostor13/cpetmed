export class Landing {
    _id: string = null
    companyid: string = null
    name: string = ''
    backgroundURL: string = null
    backgroundName: string = null
    backgroundColor: string = null
    opacity: number = 100
    logoURL: string = null
    logoName: string = null
    widthLogo: number = 0
    elements: Ielement[] = []
    elementSelected: Ielement = null
    elementSelectedIndex: number = null
    validationRut: boolean = null
    validationRutDigits: number = null
    date: Date = null
}


export class Ielement{
    name: string = ''        
    type: string = ''
    width: string = ''
    element: string = ''
    class: string = ''
    redirect: string = ''
    href: string = ''
    alt: string = ''
    src: string = ''
    email: string = ''
    phone: string = ''   
    text: string = '' 
    color: string = ''
    fontSize: string = ''
    fontWeight: string = ''
    inputs: IInput[] = []
    icons: IICon[] = []
    borderWidth: string = ''
    borderColor: string = ''
    backgroundColor: string = ''
    textColor: string = ''
    buttonBackgroundColor: string = ''
    buttonTextColor: string = ''
    buttonBorderColor: string = ''
    buttonBorderWidth: string = ''
    successMessage: string = ''
    labelColor: string = ''
    labelFontSize: string = ''
    label: string = ''
    minToday: boolean = false
    inline: boolean = false
    maxDate: Date = null
    typeLink: string = ''
    autoPlay: boolean = false
}


export class IInput{
    name: string = ''
    placeholder: string = ''
    class: string = ''
    disabled: boolean = false    
    index: number = null
    borderColor: string = ''
    backgroundColor: string = ''
    textColor: string = ''
    labelClass: string = ''
    borderWidth: string = ''
    required: boolean = false
}

export class IICon {
    name: string = ''
    image: string = ''
    redirect: string = ''
    class: string = ''    
    index: number = null
    width: string = ''    
}