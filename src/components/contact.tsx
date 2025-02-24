import { motion } from "framer-motion"
import { FiCheckCircle } from "react-icons/fi"
import {
    ChangeEvent,
    Dispatch,
    FormEvent,
    Fragment,
    MutableRefObject,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react"
import { MdEmail, MdOutlineError } from "react-icons/md"

export const Contact = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    return (
        <div id="contact" className="mt-12 mb-24">
            <div className="flex flex-col items-center justify-center mb-8">
                <span className="mx-auto mb-3 block w-fit rounded bg-gradient-to-br from-slate-800 to-slate-950 p-3 text-3xl shadow-md shadow-blue-900">
                    <MdEmail />
                </span>
                <h3 className="text-white text-3xl md:text-5xl font-light italic font-moranga">
                    Contact
                </h3>
            </div>
            <div
                ref={containerRef}
                onClick={() => {
                    inputRef.current?.focus()
                }}
                className="h-96 bg-slate-950/70 backdrop-blur rounded-lg w-full max-w-3xl mx-auto overflow-y-scroll shadow-xl cursor-text font-mono hide-scrollbar border border-slate-800/50"
            >
                <TerminalHeader />
                <TerminalBody inputRef={inputRef} containerRef={containerRef} />
            </div>
        </div>
    )
}

const TerminalHeader = () => {
    return (
        <div className="w-full p-3 bg-slate-900 flex items-center gap-1 sticky top-0">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-slate-200 font-semibold absolute left-[50%] -translate-x-[50%]">
                contact_form.exe
            </span>
        </div>
    )
}

const TerminalBody = ({ containerRef, inputRef }: TerminalBodyProps) => {
    const [focused, setFocused] = useState(false)
    const [text, setText] = useState("")

    const [questions, setQuestions] = useState(QUESTIONS)

    const curQuestion = questions.find((q) => !q.complete)

    const handleSubmitLine = (value: string) => {
        if (curQuestion) {
            setQuestions((pv) =>
                pv.map((q) => {
                    if (q.key === curQuestion.key) {
                        return {
                            ...q,
                            complete: true,
                            value,
                        }
                    }
                    return q
                })
            )
        }
    }

    return (
        <div className="p-2 text-slate-100 text-lg">
            <InitialText />
            <PreviousQuestions questions={questions} />
            <CurrentQuestion curQuestion={curQuestion} />
            {curQuestion ? (
                <CurLine
                    text={text}
                    focused={focused}
                    setText={setText}
                    setFocused={setFocused}
                    inputRef={inputRef}
                    command={curQuestion?.key || ""}
                    handleSubmitLine={handleSubmitLine}
                    containerRef={containerRef}
                />
            ) : (
                <Summary
                    questions={questions}
                    setQuestions={setQuestions}
                    containerRef={containerRef}
                />
            )}
        </div>
    )
}

const InitialText = () => {
    return (
        <>
            <p>Hey there! I'm excited to get talking, please let me know what you are interested in!</p>
            <p className="whitespace-nowrap overflow-hidden font-light">
                ------------------------------------------------------------------------
            </p>
        </>
    )
}

const PreviousQuestions = ({ questions }: PreviousQuestionProps) => {
    return (
        <>
            {questions.map((q, i) => {
                if (q.complete) {
                    return (
                        <Fragment key={i}>
                            <p>
                                {q.text || ""}
                                {q.postfix && (
                                    <span className="text-violet-300">{q.postfix}</span>
                                )}
                            </p>
                            <p className="text-emerald-300">
                                <FiCheckCircle className="inline-block mr-2" />
                                <span>{q.value}</span>
                            </p>
                        </Fragment>
                    )
                }
                return <Fragment key={i}></Fragment>
            })}
        </>
    )
}

const CurrentQuestion = ({ curQuestion }: CurrentQuestionProps) => {
    if (!curQuestion) return <></>

    return (
        <p>
            {curQuestion.text || ""}
            {curQuestion.postfix && (
                <span className="text-violet-300">{curQuestion.postfix}</span>
            )}
        </p>
    )
}

const TerminalResponse = ({ containerRef }: { containerRef: MutableRefObject<HTMLDivElement | null> }) => {
    const [stage, setStage] = useState(0);

    const messages = [
        { type: 'command', text: '> Initializing email service...' },
        { type: 'error', text: 'ERROR: Email service not found' },
        { type: 'command', text: '> Checking budget status...' },
        { type: 'error', text: 'CRITICAL: Insufficient funds detected' },
        { type: 'command', text: '> Attempting to process anyway...' },
        { type: 'error', text: 'FATAL: Server running on hopes and dreams only' },
        { type: 'success', text: '> Message saved to /dev/null' },
        { type: 'info', text: 'For actual inquiries, please contact me via Discord, Telegram or email at crspy8687@gmail.com' },
    ];

    useEffect(() => {
        if (stage < messages.length - 1) {
            const timer = setTimeout(() => {
                setStage(prev => prev + 1);
                // Add a small delay to ensure the new content is rendered
                setTimeout(() => {
                    if (containerRef.current) {
                        containerRef.current.scrollTo({
                            top: containerRef.current.scrollHeight,
                            behavior: 'smooth'
                        });
                    }
                }, 50);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [stage, containerRef]);

    return (
        // Add padding at the bottom to ensure the cursor is visible
        <div className="space-y-2 pb-6">
            {messages.slice(0, stage + 1).map((msg, idx) => (
                <p key={idx} className={`font-mono ${
                    msg.type === 'error' ? 'text-red-500' :
                        msg.type === 'success' ? 'text-emerald-300' :
                            msg.type === 'info' ? 'text-blue-300' :
                                'text-slate-100'
                }`}>
                    {msg.type === 'error' && <MdOutlineError className="inline-block mr-2" />}
                    {msg.type === 'success' && <FiCheckCircle className="inline-block mr-2" />}
                    {msg.text}
                </p>
            ))}
            {stage === messages.length - 1 && (
                <motion.span
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear",
                        times: [0, 0.5, 0.5, 1],
                    }}
                    className="inline-block w-2 h-5 bg-slate-400 translate-y-1 ml-0.5"
                />
            )}
        </div>
    );
};

const Summary = ({ questions, setQuestions, containerRef }: SummaryProps) => {
    const [complete, setComplete] = useState(false)

    const handleReset = () => {
        setQuestions((pv) => pv.map((q) => ({ ...q, value: "", complete: false })))
    }

    const handleSend = () => {
        const formData = questions.reduce((acc, val) => {
            return { ...acc, [val.key]: val.value }
        }, {})

        console.log(formData)

        setComplete(true)
    }

    return (
        <>
            <p>Beautiful! Here's what we've got:</p>
            {questions.map((q) => {
                return (
                    <p key={q.key}>
                        <span className="text-blue-300">{q.key}:</span> {q.value}
                    </p>
                )
            })}
            <p>Look good?</p>
            {complete ? (
                <TerminalResponse containerRef={containerRef} />
            ) : (
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={handleReset}
                        className="px-3 py-1 text-base hover:opacity-90 transition-opacity rounded bg-slate-100 text-black"
                    >
                        Restart
                    </button>
                    <button
                        onClick={handleSend}
                        className="px-3 py-1 text-base hover:opacity-90 transition-opacity rounded bg-emerald-500 text-white"
                    >
                        Send it!
                    </button>
                </div>
            )}
        </>
    )
}


const CurLine = ({
                     text,
                     focused,
                     setText,
                     setFocused,
                     inputRef,
                     command,
                     handleSubmitLine,
                     containerRef,
                 }: CurrentLineProps) => {
    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        handleSubmitLine(text)
        setText("")
        setTimeout(() => {
            scrollToBottom()
        }, 0)
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
        scrollToBottom()
    }

    useEffect(() => {
        return () => setFocused(false)
    }, [])

    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    ref={inputRef}
                    onChange={onChange}
                    value={text}
                    type="text"
                    className="sr-only"
                    autoComplete="off"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
            </form>
            <p>
                <span className="text-emerald-400">➜</span>{" "}
                <span className="text-cyan-300">~</span>{" "}
                {command && <span className="opacity-50">Enter {command}: </span>}
                {text}
                {focused && (
                    <motion.span
                        animate={{ opacity: [1, 1, 0, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: "linear",
                            times: [0, 0.5, 0.5, 1],
                        }}
                        className="inline-block w-2 h-5 bg-slate-400 translate-y-1 ml-0.5"
                    />
                )}
            </p>
        </>
    )
}

const QUESTIONS: QuestionType[] = [
    {
        key: "email",
        text: "To start, could you give me ",
        postfix: "your email?",
        complete: false,
        value: "",
    },
    {
        key: "name",
        text: "Awesome! What should I ",
        postfix: "call you?",
        complete: false,
        value: "",
    },
    {
        key: "description",
        text: "Perfect, and ",
        postfix: "how can I help you?",
        complete: false,
        value: "",
    },
]

interface CurrentLineProps {
    text: string
    focused: boolean
    setText: Dispatch<SetStateAction<string>>
    setFocused: Dispatch<SetStateAction<boolean>>
    inputRef: MutableRefObject<HTMLInputElement | null>
    command: string
    handleSubmitLine: (value: string) => void
    containerRef: MutableRefObject<HTMLDivElement | null>
}

type QuestionType = {
    key: string
    text: string
    postfix?: string
    complete: boolean
    value: string
}

interface TerminalBodyProps {
    containerRef: MutableRefObject<HTMLDivElement | null>
    inputRef: MutableRefObject<HTMLInputElement | null>
}

interface PreviousQuestionProps {
    questions: QuestionType[]
}

interface SummaryProps {
    questions: QuestionType[]
    setQuestions: Dispatch<SetStateAction<QuestionType[]>>
    containerRef: MutableRefObject<HTMLDivElement | null>
}

interface CurrentQuestionProps {
    curQuestion: QuestionType | undefined
}