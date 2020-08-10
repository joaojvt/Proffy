import * as React from 'react';
import PageHeader from '../../components/PageHeader';

import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import warningIcon from '../../assets/images/icons/warning.svg';
import Select from '../../components/Select';

import './styles.css';
import api from '../../services/api';
import { useHistory } from 'react-router-dom';

function TeacherForm() {
    const history = useHistory()

    const [name, setName] = React.useState('')
    const [avatar, setAvatar] = React.useState('')
    const [whatsapp, setWhatsapp] = React.useState('')
    const [bio, setBio] = React.useState('')

    const [subject, setSubject] = React.useState('')
    const [cost, setCost] = React.useState('')

    const [schedulesItems, setScheduleItems] = React.useState([
        { week_day: 0, from: '', to: '' }
    ])

    function addNewScheduleItem() {
        setScheduleItems([
            ...schedulesItems,
            { week_day: 0, from: '', to: '' }
        ]);
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = schedulesItems.map((schedulesItem, index) => {
            if (index === position) {
                return { ...schedulesItem, [field]: value }
            }
            return schedulesItem
        })

        setScheduleItems(updatedScheduleItems)
    }

    function handleCreateClass(e: React.FormEvent) {
        e.preventDefault()
        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: schedulesItems
        }).then(() => {
                alert('Cadastro realizado com sucesso!')
                
                history.push('/')
            })
            .catch(() => alert('Erro no cadastro'))
    }

    return (
        <div id="page-teacher-form" className="conteiner">
            <PageHeader
                title="Que incrivel que você quer dar aulas."
                description="O primeiro passo é preencher esse o formulário de inscrição."
            />
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input name="name" label="Nome completo" value={name} onChange={e => {
                            setName(e.target.value)
                        }} />
                        <Input name="avatar" label="Avatar" value={avatar} onChange={e => {
                            setAvatar(e.target.value)
                        }} />
                        <Input name="whatsapp" label="WhatsApp" value={whatsapp} onChange={e => {
                            setWhatsapp(e.target.value)
                        }} />
                        <Textarea name="bio" label="Biografia" value={bio} onChange={e => {
                            setBio(e.target.value)
                        }} />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={e => {
                                setSubject(e.target.value)
                            }}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Bíologia', label: 'Bíologia' },
                                { value: 'Educação física', label: 'Educação física' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'História', label: 'História' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Química', label: 'Química' },
                            ]}
                        />
                        <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange={e => {
                            setCost(e.target.value)
                        }} />
                    </fieldset>

                    <fieldset>
                        <legend>Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                        </button>
                        </legend>
                        {schedulesItems.map((schedulesItem, index) => {
                            return (
                                <div key={schedulesItem.week_day} className="schedule-item">
                                    <Select
                                        name="week_day"
                                        label="Dia da semana"
                                        value={schedulesItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        options={[
                                            { value: '0', label: 'Domigo' },
                                            { value: '1', label: 'Segunda-feira' },
                                            { value: '2', label: 'Terça-feira' },
                                            { value: '3', label: 'Quarta-feira' },
                                            { value: '4', label: 'Quinta-feira' },
                                            { value: '5', label: 'Sexta-feira' },
                                            { value: '6', label: 'Sábado' }
                                        ]}
                                    />
                                    <Input name="from" label="Das"
                                        value={schedulesItem.from} type="time"
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)} />
                                    <Input name="to" label="Até"
                                        value={schedulesItem.to} type="time"
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)} />
                                </div>
                            )
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                        <button type="submit">
                            Salvar cadastro
                    </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}
export default TeacherForm