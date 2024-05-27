package com.mfratila.assignmentSubmission.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentEnum {
    ASSIGNMENT_1(1, "Hello World", "Introducere în Programare", "Primul pas în orice limbaj de programare este să înveți să rulezi un script simplu care afișează 'Hello, World!' pe ecran."),
    ASSIGNMENT_2(2, "Calculator Simplu", "Lucrul cu Input/Output", "Învață să creezi un calculator simplu care poate efectua operații matematice de bază folosind input de la utilizator."),
    ASSIGNMENT_3(3, "Joc de Ghicit Numărul", "Structuri de Control", "Dezvoltă un joc simplu unde utilizatorul trebuie să ghicească un număr aleatoriu generat de program."),
    ASSIGNMENT_4(4, "Galerie de Imagini", "Manipularea DOM", "Creează o galerie de imagini unde utilizatorii pot naviga prin imagini folosind butoane."),
    ASSIGNMENT_5(5, "Galerie de Imagini", "Evenimente și Stare", "Creează o galerie de imagini unde utilizatorii pot naviga prin imagini folosind butoane."),
    ASSIGNMENT_6(6, "Galerie de Imagini", "Stocarea Datelor Local", "Construiește o aplicație unde utilizatorii pot adăuga, șterge și bifa sarcini."),
    ASSIGNMENT_7(7, "Blog Simplu", "Aplicații CRUD", "Dezvoltă o aplicație web simplă unde utilizatorii pot crea, citi, actualiza și șterge articole de blog."),
    ASSIGNMENT_8(8, "Chat Simplu", "WebSocket-uri", "Implementează o aplicație de chat unde utilizatorii pot trimite și primi mesaje în timp real."),
    ASSIGNMENT_9(9, "Joc de Tip Quiz", "Interactivitate Complexă", "Creează un joc de quiz care testează cunoștințele utilizatorilor cu întrebări din diverse domenii."),
    ASSIGNMENT_10(10, "Aplicație de Rezervări", "Manipularea Datei și Ora", "Realizează o aplicație pentru rezervări unde utilizatorii pot alege date și ore pentru întâlniri sau evenimente."),
    ASSIGNMENT_11(11, "Single Page Application", "SPA cu React", "Învață să construiești o aplicație complexă cu pagină unică folosind React."),
    ASSIGNMENT_12(12, "Platformă de e-Commerce", "Integrare Completă", "Dezvoltă o platformă de e-commerce cu coș de cumpărături, gestionare de produse și procesare de plăți."),
    ASSIGNMENT_13(13, "Aplicație de Recunoaștere a Imaginilor", "Învățare Automată", "Utilizează TensorFlow.js pentru a crea o aplicație care recunoaște obiecte și persoane din imagini."),
    ASSIGNMENT_14(14, "Dashboard de Vizualizare a Datelor", "Grafice și Date", "Construiește un dashboard interactiv pentru vizualizarea datelor complexe cu ajutorul bibliotecilor JavaScript de grafice.");

    private final int assignmentNum;
    private final String assignmentName;
    private final String assignmentSubtitle;
    private final String assignmentDesc;

    AssignmentEnum(int assignmentNum, String assignmentName, String assignmentSubtitle, String assignmentDesc) {
        this.assignmentNum = assignmentNum;
        this.assignmentName = assignmentName;
        this.assignmentSubtitle = assignmentSubtitle;
        this.assignmentDesc = assignmentDesc;
    }

    public int getAssignmentNum() {
        return assignmentNum;
    }

    public String getAssignmentName() {
        return assignmentName;
    }

    public String getAssignmentSubtitle() { return assignmentSubtitle; }

    public String getAssignmentDesc() { return assignmentDesc; }

    public static AssignmentEnum findByNumber(int number) {
        for (AssignmentEnum assignment : AssignmentEnum.values()) {
            if (assignment.getAssignmentNum() == number) {
                return assignment;
            }
        }
        return null; // or throw an exception if preferred
    }
}
