import './admin.css'
import { useState, useEffect } from 'react'
import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore'

export default function Admin() {
    const [posts, setPosts] = useState([])
    const [tituloInput, setTituloInput] = useState('');
    const [imagemInput, setImagemInput] = useState('');
    const [videoInput, setVideoInput] = useState('');
    const [user, setUser] = useState({})
    const [edit, setEdit] = useState({})

    useEffect(() => {
        async function loadTarefas() {
            const userDetail = localStorage.getItem("@detailUser");
            setUser(JSON.parse(userDetail));
        
            if (userDetail) {
                const data = JSON.parse(userDetail);
        
                const postsRef = collection(db, "posts");
                const q = query(postsRef, orderBy("created", "desc"), where("userUid", "==", data?.uid));
                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = [];
                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            titulo: doc.data().titulo,
                            imagem: doc.data().imagem,
                            video: doc.data().video,
                            userUid: doc.data().userUid
                        });
                    });
                    console.log(lista);
                    setPosts(lista);
                });
            }
        }

        loadTarefas();
    }, []);

    async function handleRegister(e) {
        e.preventDefault();
        if (tituloInput === '') {
            alert("Digite o título da tarefa...")
            return;
        }

        if (edit?.id) {
            await handleUpdatePost();
            return;
        }

        await addDoc(collection(db, "posts"), {
            titulo: tituloInput,
            imagem: imagemInput,
            video: videoInput,
            created: new Date(),
            userUid: user?.uid
        })
            .then(() => {
                console.log("POST REGISTRADO!")
                setTituloInput('');
                setImagemInput('');
                setVideoInput('');
            })
            .catch((error) => {
                console.log("ERRO AO REGISTRAR " + error)
            })
    }

    async function handleUpdatePost() {
        if (!edit?.id) {
            return;
        }

        const docRef = doc(db, "posts", edit.id);

        const updatedFields = {};

        if (tituloInput !== '') {
            updatedFields.titulo = tituloInput;
        }

        if (imagemInput !== '') {
            updatedFields.imagem = imagemInput;
        }

        if (videoInput !== '') {
            updatedFields.video = videoInput;
        }

        await updateDoc(docRef, updatedFields)
            .then(() => {
                console.log("POST ATUALIZADO");
                setTituloInput('');
                setImagemInput('');
                setVideoInput('');
                setEdit({});
            })
            .catch(() => {
                console.log("ERRO AO ATUALIZAR")
                setTituloInput('');
                setImagemInput('');
                setVideoInput('');
                setEdit({});
            });
    }

    async function handleLogout() {
        await signOut(auth);
    }

    function editPost(item) {
        setTituloInput(item.titulo);
        setImagemInput(item.imagem);
        setVideoInput(item.video);
        setEdit(item);
    }

    async function deletePost(id) {
        const confirmation = window.confirm("Tem certeza que deseja deletar este post?");
        if (confirmation) {
            const docRef = doc(db, "posts", id);
            await deleteDoc(docRef);
        }
    }

    return (
        <div className='admin-container'>
            <h1>Meus Posts</h1>
            <form className='form' onSubmit={handleRegister}>
                <input
                    type='text'
                    placeholder='Digite o titulo do vídeo...'
                    value={tituloInput}
                    onChange={(e) => setTituloInput(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Link da imagem...'
                    value={imagemInput}
                    onChange={(e) => setImagemInput(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Link do vídeo incorporado...'
                    value={videoInput}
                    onChange={e => setVideoInput(e.target.value)}
                />

                {Object.keys(edit).length > 0 ? (
                    <button className='btn-register' style={{backgroundColor: '#6add39'}} type='submit'>Atualizar post</button>
                ) : (
                    <button className='btn-register' type='submit'>Registrar post</button>
                )}
            </form>
            <h2 className='titulo-postados'>Postados</h2>
            {posts.map((item) => (
                <article key={item.id} className='list'>
                    <h2 className='tituloVideo'>Titulo: {item.titulo}</h2>
                    <img src={item.imagem} className='imagemAdmin' />
                    <p>Embed: {item.video}</p>
                    <div className='secaoBotoes'>
                        <button onClick={() => editPost(item)}>Editar</button>
                        <button onClick={() => deletePost(item.id)} className='btn-delete'>Deletar</button>
                    </div>
                </article>
            ))}
            <button className='btn-logout' onClick={handleLogout}>Sair</button>
        </div>
    )
}
