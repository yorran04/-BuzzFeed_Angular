import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../data/quizz_questions.json"

@Component({
  selector: 'app-quiiz',
  templateUrl: './quiiz.component.html',
  styleUrls: ['./quiiz.component.css']
})
export class QuiizComponent implements OnInit {
  title:string = ''

  questions:any 

  questionSelected:any 

  respostas:string[] = []

  respostaSelecionada:string=''

  questionIndex:number = 0
  questionMaxIndex:number = 0

  final:boolean = false

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.final = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      console.log(this.questionIndex, this.questionMaxIndex)
    }
  }

  playerChoose(value:string){
    this.respostas.push(value)
    this.nextStep()
    
  }

 async nextStep(){
    this.questionIndex += 1
    
    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const respostaFinal:string = await this.checkResultado(this.respostas) 
      this.final = true
      this.respostaSelecionada = quizz_questions.results[respostaFinal as keyof typeof quizz_questions.results ]

    }
  }

  async checkResultado(respostas:string[]){
    const resultado = respostas.reduce((previus, cucrrent, i, arr)=>{
      if(arr.filter(item => item === previus).length >
      arr.filter(item => item === cucrrent).length){
        return previus
      }else{
        return cucrrent
      }
    })
    return resultado
  }
  
}
