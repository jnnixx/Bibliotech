import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emprestimo } from 'src/app/models/emprestimo';
import { Livro } from 'src/app/models/livro';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { LivroService } from 'src/app/services/livro.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-editar-emprestimo',
  templateUrl: './editar-emprestimo.component.html',
  styleUrls: ['./editar-emprestimo.component.css']
})
export class EditarEmprestimoComponent implements OnInit {

  public formAtualizarEmprestimo: FormGroup;
  public statusList: string[] = ['DEVOLVIDO', 'PENDENTE']
  public emprestimo!: Emprestimo;
  public livrosList!: Livro[];

  constructor(
    private fb: FormBuilder,
    private emprestimoService: EmprestimoService,
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private livrosService: LivroService
  ) {
    this.formAtualizarEmprestimo = fb.group({
      email: ["", [Validators.required, Validators.email]],
      telefone: ["", [Validators.required]],
      status: [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.listarLivros();
    this.initilizeFields();
  }

  private listarLivros(): void {
    this.livrosService.findAll().subscribe((livros) => {
      this.livrosList = livros;
    }
    )
  }

  private initilizeFields(): void {
    const id = this.route.snapshot.params["id"];
    this.emprestimoService.findById(id).subscribe(emprestimo => {
      this.emprestimo = emprestimo;
      this.formAtualizarEmprestimo.patchValue(emprestimo)
    });
  }

  public updateLending(): void {
    console.log(this.formAtualizarEmprestimo.value)
    if (this.formAtualizarEmprestimo.valid) {
      const emprestimo: Emprestimo = {
        id: this.emprestimo.id,
        leitor: this.emprestimo.leitor,
        email: this.formAtualizarEmprestimo.get('email')?.value,
        dataEmprestimo: this.emprestimo.dataEmprestimo,
        telefone: this.formAtualizarEmprestimo.get('telefone')?.value,
        status: this.formAtualizarEmprestimo.get('status')?.value
      }
      this.emprestimoService.updateLending(emprestimo).subscribe(response => {
        this.notification.showMessage("Emprestimo atualizado com sucesso.");
        this.router.navigate(["/dashboard"]);
      });
    }
    else {
      this.notification.showMessage("Dados inválidos.");
    }
  }

}
