///////////////////////////////partial

interface Students{
    name: string,
    grade: "A" | "B" | "C", 
    hobbies?: string[]
}

const updateStudent = (student: Students, propsToUpdate: Partial<Students>):Students => {
    return ({...student, ...propsToUpdate});
}

const jeel:Students = {name: "jeel", grade: "C"};

console.log(updateStudent(jeel, {grade: 'A', hobbies: ['run', 'games']}));


//////////////////////////////////////////////required

const changeStudent = (student: Students, propsToUpdate: Required<Students>):Students => {
    return ({...student, ...propsToUpdate});
};

console.log(changeStudent(jeel, {name:'jeel', grade: 'C', hobbies: ['run2']}));


/////////////////////////////////////////////readonly

const ishan2:Readonly<Students> = {...jeel};

//ishan2.name = 'parth';


//////////////////////////////////////////////////record


const abcd: Record<string, string> = {
    first_letter: 'a',
    second_letter: 'b',
    third_letter: 'c',
    fourth_letter: 'd'
};



type name =  'first_letter' | 'second_letter' | 'third_letter' | 'fourth_letter';

type letter = 'a' | 'b' | 'c' | 'd';

const xyz : Record<name, letter> = {
    first_letter: "a",
    second_letter: "b",
    third_letter: "c",
    fourth_letter: "d"
};



interface dfg{
    name: string
};

const hjk: Record<string, dfg> = {
    hello: {name: 'ishn'},
    //juyu: 'hrll'
};


///////////////////////////////////////////////pick and omit

type student1 = Pick<Students, "grade">;

type student2 = Omit<Student, 'grade'>;

///////////////////////////////////////////////extract and exclude

type letter1 = Exclude<letter, 'a' | 'b'>;

type letter2 = Extract<letter, 'a' | 'b'>

///////////////////////////////////////////////nonnullable

type g = string | number | null | undefined ;

type f = NonNullable<g>;

/////////////////////////////////////////////////return type

const returnType = (a: number, b: number) => {
    return {sum : a + b};
};

type ghj = ReturnType< typeof returnType>;

const vgh: ghj = returnType(12, 13);

///////////////////////////////////////////////////parameters

type jhk =  Parameters<typeof returnType>;


const ghjk: jhk = [12, 13];

const hello = returnType(...ghjk);

//////////////////////////////////////////////////awaited


const helloIshan = async ():Promise<string[]> =>{
    return ["hello", "ishan"];
};

type helloishan = Awaited<ReturnType<typeof helloIshan>>;

