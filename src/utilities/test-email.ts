
const TEST_EMAILS = {
  admin: [
    "liam.bennett@arkahalder.com",
    "emma.foster@arkahalder.com",
    "aarav.sharma@arkahalder.com",
    "riya.mukherjee@arkahalder.com",
    "juan.delacruz@arkahalder.com"
  ],
  employee: [
    "james.howard@arkahalder.com",
    "olivia.clark@arkahalder.com",
    "noah.hayes@arkahalder.com",
    "ava.turner@arkahalder.com",
    "ethan.russell@arkahalder.com",
    "charlotte.bryant@arkahalder.com",
    "mason.reed@arkahalder.com",
    "amelia.griffin@arkahalder.com",
    "logan.barker@arkahalder.com",
    "scarlett.todd@arkahalder.com",
    "isha.mehta@arkahalder.com",
    "rohan.verma@arkahalder.com",
    "ananya.reddy@arkahalder.com",
    "vivaan.iyer@arkahalder.com",
    "diya.kapoor@arkahalder.com",
    "kunal.bansal@arkahalder.com",
    "sneha.joshi@arkahalder.com",
    "aditya.nair@arkahalder.com",
    "pooja.chatterjee@arkahalder.com",
    "yash.patil@arkahalder.com",
    "arjun.desai@arkahalder.com",
    "neha.kulkarni@arkahalder.com",
    "dev.singh@arkahalder.com",
    "meera.jain@arkahalder.com",
    "siddharth.rao@arkahalder.com",
    "tanvi.pillai@arkahalder.com",
    "kabir.dutta@arkahalder.com",
    "aanya.bhatt@arkahalder.com",
    "maria.santos@arkahalder.com",
    "jose.ramos@arkahalder.com",
    "angelica.reyes@arkahalder.com",
    "mark.villanueva@arkahalder.com",
    "grace.bautista@arkahalder.com",
    "paolo.garcia@arkahalder.com",
    "kristine.mendoza@arkahalder.com"
  ]
};

type Category = 'admin' | 'employee';

export const getRandomInt: (max: number, min?: number) => number = (max, min = 0) => {
  return Math.floor(Math.random() * max) + min;
};


export const getTestEmail: (category: Category) => string = (category) => {
  const source: string[] = TEST_EMAILS[category];
  return source[getRandomInt(source.length)];
};
