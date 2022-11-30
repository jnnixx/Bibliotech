import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Emprestimo } from 'src/app/models/emprestimo';
import { Livro } from 'src/app/models/livro';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { LivroService } from 'src/app/services/livro.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-novo-emprestimo',
  templateUrl: './novo-emprestimo.component.html',
  styleUrls: ['./novo-emprestimo.component.css']
})
export class NovoEmprestimoComponent implements OnInit {

  public formNovoEmprestimo: FormGroup;
  public statusList: string[] = ['DEVOLVIDO', 'PENDENTE'];
  public livrosList!: Livro[];

  constructor(
    private fb: FormBuilder,
    private emprestimoService: EmprestimoService,
    private notification: NotificationService,
    private router: Router,
    private livrosService: LivroService
  ) {
    this.formNovoEmprestimo = fb.group({
      leitor: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      telefone: ["", [Validators.required]],
      status: [[], [Validators.required]],
      livro: [{}, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.listarLivros();
  }

  public listarLivros(): void {
    this.livrosService.findAll().subscribe((livros) => {
      this.livrosList = livros;
    }
    )
  }

  public createLending(): void {
    if (this.formNovoEmprestimo.valid) {
      const novoEmprestimo: Emprestimo = this.formNovoEmprestimo.value;
      novoEmprestimo.dataEmprestimo = new Date().toLocaleDateString();
      this.emprestimoService.createLending(novoEmprestimo).subscribe(response => {
        this.notification.showMessage("Novo empréstimo cadastrado com sucesso.");
        this.router.navigate(["/dashboard"]);
      });
    }
    else {
      this.notification.showMessage("Dados inválidos.");
    }
  }

}
