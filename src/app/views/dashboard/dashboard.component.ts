import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetalhesComponent } from 'src/app/components/detalhes/detalhes.component';
import { Emprestimo } from 'src/app/models/emprestimo';
import { Livro } from 'src/app/models/livro';
import { EmprestimoService } from 'src/app/services/emprestimo.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns = ['leitor', 'titulo', 'dataEmprestimo', 'status', 'excluir', 'editar', 'capa'];
  dataSource!: Emprestimo[];
  livro!: Livro;
  hidden: boolean = true;

  constructor(
    private emprestimoService: EmprestimoService,
    private notification: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initializeTable();
  }

  private initializeTable(): void {
    this.emprestimoService.findAll().subscribe(emprestimos => {
      this.dataSource = emprestimos;
    });
  }

  public deleteLivro(id: string): void {
    this.emprestimoService.deleteLending(id).subscribe(response => {
      this.notification.showMessage("Emprestimo apagado.");
      this.initializeTable();
    });
  }

  public openDetalhes(livro: Livro): void {
    this.dialog.open(DetalhesComponent, {
      width: "400px",
      data: livro
    });
  }
}
