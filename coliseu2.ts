class ItemMenu {
    opcao: string;
    textoDaOpcao: string;

    constructor(opcao: string, textoDaOpcao: string) {
        this.opcao = opcao;
        this.textoDaOpcao = textoDaOpcao;
    }
}

class Menu {
    itensMenu: ItemMenu[];

    constructor() {
        this.itensMenu = [
            new ItemMenu("1", "atacar"),
            new ItemMenu("2", "ataque especial"),
            new ItemMenu("3", "tomar poção de Cura de HP"),
            new ItemMenu("4", "tomar poção que restaura MP"),
            new ItemMenu("5", "defender"),
        ];
    }

    imprimirMenu(): string {
        console.log("opções do Menu:");
        this.itensMenu.forEach(item => {
            console.log(`${item.opcao} - ${item.textoDaOpcao}`);
        });

        const opcaoSelecionada = prompt("selecione uma opção: ");
        return opcaoSelecionada || ""; 
    }
}

class Coliseu {
    monstro: Monstro;

    constructor(monstro: Monstro) {
        this.monstro = monstro;
    }
}

class Monstro {
    hp: number;
    forcaAtaque: number;
    forcaDefesa: number;

    constructor(hp: number, forcaAtaque: number, forcaDefesa: number) {
        this.hp = hp;
        this.forcaAtaque = forcaAtaque;
        this.forcaDefesa = forcaDefesa;
    }

    receberDano(danoSofrido: number): number {
        const danoReduzido = Math.max(0, danoSofrido - this.forcaDefesa);
        this.hp -= danoReduzido;

        if (this.hp <= 0) {
            console.log("Monstro derrotado");
            this.hp = 0;
        } else if (this.hp <= 0.25) {
            this.forcaAtaque *= 1.1;
            this.forcaDefesa *= 1.3;
        }

        return this.hp;
    }

    ataque(): number {
        return this.forcaAtaque;
    }
}

class Equipamento {
    nome: string;
    aumentoAtaque: number;
    aumentoDefesa: number;

    constructor(nome: string, aumentoAtaque: number, aumentoDefesa: number) {
        this.nome = nome;
        this.aumentoAtaque = aumentoAtaque;
        this.aumentoDefesa = aumentoDefesa;
    }
}

class Lutador {
    hp: number;
    mp: number;
    ataqueBase: number;
    defesaBase: number;
    equipamentoCabeca: Equipamento | null;
    equipamentoCorpo: Equipamento | null;
    equipamentoMao: Equipamento | null;

    constructor(hp: number, mp: number, ataqueBase: number, defesaBase: number) {
        this.hp = hp;
        this.mp = mp;
        this.ataqueBase = ataqueBase;
        this.defesaBase = defesaBase;
        this.equipamentoCabeca = null;
        this.equipamentoCorpo = null;
        this.equipamentoMao = null;
    }

    equipar(equipamento: Equipamento, local: string): void {
        switch (local) {
            case "cabeça":
                this.equipamentoCabeca = equipamento;
                break;
            case "corpo":
                this.equipamentoCorpo = equipamento;
                break;
            case "mão":
                this.equipamentoMao = equipamento;
                break;
            default:
                console.log("Local de equipamento inválido");
        }
    }

    exibirInfoLutador(): void {
        console.log("Informações do Lutador:");
        console.log("HP:", this.hp);
        console.log("MP:", this.mp);
        console.log("Ataque Base:", this.ataqueBase);
        console.log("Defesa Base:", this.defesaBase);
        console.log("Equipamento para a cabeça:", this.equipamentoCabeca);
        console.log("Equipamento para o corpo:", this.equipamentoCorpo);
        console.log("Equipamento para a mão:", this.equipamentoMao);
    }

    ataque(): number {
        let ataqueTotal = this.ataqueBase;
        if (this.equipamentoMao) {
            ataqueTotal += this.equipamentoMao.aumentoAtaque;
        }
        return ataqueTotal;
    }

    ataqueEspecial(): number {
        if (this.mp >= 20) {
            this.mp -= 20;
            return this.ataque() * 1.5;
        } else {
            console.log("MP insuficiente");
            return 0;
        }
    }

    receberDano(danoSofrido: number): number {
        const danoReduzido = Math.max(0, danoSofrido - this.defesaBase);
        this.hp -= danoReduzido;
        return this.hp;
    }

    tomarPocaoHP(): void {
        this.hp += this.hp * 0.25;
    }

    tomarPocaoMP(): void {
        this.mp += this.mp * 0.25;
    }
}

//essa 6. eu não consegui fazer de verdade

if (hpLutadorAposAtaque <= 0) {
    console.log("Você foi destroçado pelo monstro."); //eu tentei fazer o continuar jogando com while so que por alguma razão tava dando
    continuarJogando = false;

//chamadas e testes
const menu = new Menu();
const opcaoSelecionada = menu.imprimirMenu();
const monstro = new Monstro(100, 20, 10);

const equipamentoCabeca = new Equipamento("Bandana de Ninja", 8, 15);
const equipamentoCorpo = new Equipamento("Cota de Couro", 20, 35);
const equipamentoMao = new Equipamento("Arco de Caça", 25, 5);

const lutador = new Lutador(100, 50, 15, 10)
lutador.equipar(equipamentoCabeca, "cabeça");
lutador.equipar(equipamentoCorpo, "corpo");
lutador.equipar(equipamentoMao, "mão");
lutador.exibirInfoLutador();


//monstro
console.log("hp monstro teste:", monstro.hp);
console.log("ataque monstro teste", monstro.ataque());
console.log("vida do monstro dps teste", monstro.receberDano(30));

//equipamento
console.log("equipamento para a cabeça:", equipamentoCabeca);
console.log("equipamento para o corpo:", equipamentoCorpo);
console.log("equipamento para a mão:", equipamentoMao);


//lutador
console.log("lutador:");

console.log("ataque:", lutador.ataque());
console.log("ataque especial:", lutador.ataqueEspecial());
console.log("HP apos receber 30 de dano:", lutador.receberDano(30));
lutador.tomarPocaoHP();
lutador.tomarPocaoMP();
console.log("HP apos tomar poção de cura:", lutador.hp);
console.log("MP apos tomar poção de mana:", lutador.mp);